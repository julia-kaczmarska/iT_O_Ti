import React, { useState } from 'react';
import { Grid, GridItem, Icon, Box } from '@chakra-ui/react';
import { useCategories } from './CategoriesContext';
import CategorySettings from './CategorySettings';
import BlockColorPicker from './BlockColorPicker';

const ColorPoints = () => {
    const { categories, updateCategory } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(null); // Przechowuje wybraną kategorię dla wyboru koloru

    const handleColorChange = (categoryId, newColor) => {
        const updatedCategory = categories.find(cat => cat.categoryId === categoryId);
        console.log("Updated category:", updatedCategory); // Debugowanie

        if (updatedCategory) {
            updateCategory({ ...updatedCategory, color: newColor });
            setSelectedCategory(null); // Ukrycie palety po wyborze koloru

            // Aktualizacja w bazie danych
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            fetch(`http://localhost:8080/user/${userId}/category/${categoryId}/color`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ color: newColor }),
            }).catch(error => console.error("Error updating color in database:", error));
        }
    };

    return (
        <Grid templateColumns="20px 1fr" gap={4}>
            {categories && categories.length > 0 ? (
                categories.map(category => {
                    console.log("Rendering category:", category); // Debugowanie
                    return (
                        <React.Fragment key={category.categoryId}>
                            <GridItem>
                                <Icon
                                    viewBox="0 0 200 200"
                                    color={category.color || 'gray.400'}
                                    boxSize={4}
                                    cursor="pointer"
                                    onClick={() => setSelectedCategory(category.categoryId)} // Kliknięcie pokazuje paletę
                                >
                                    <path
                                        fill="currentColor"
                                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                    />
                                </Icon>

                                {/* Wyświetlanie palety kolorów tylko dla wybranej kategorii */}
                                {selectedCategory === category.categoryId && (
                                    <Box mt={2}>
                                        <BlockColorPicker
                                            previousColor={category.color}
                                            onColorSelect={(newColor) => handleColorChange(category.categoryId, newColor)}
                                        />
                                    </Box>
                                )}
                            </GridItem>
                            <GridItem>
                                <CategorySettings category={category} />
                            </GridItem>
                        </React.Fragment>
                    );
                })
            ) : (
                <GridItem colSpan={2}>No categories available</GridItem>
            )}
        </Grid>
    );
};

export default ColorPoints;

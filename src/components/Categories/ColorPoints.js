import React, { useState, useEffect, useRef } from 'react';
import {
    Grid,
    GridItem,
    Icon,
    Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow,
} from '@chakra-ui/react';
import { useCategories } from './CategoriesContext';
import CategorySettings from './CategorySettings';
import ChromePicker from "./ChromePicker";

const ColorPoints = () => {
    const { categories, updateCategory } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const pickerRef = useRef(null);

    const handleColorChange = (categoryId, newColor) => {
        const updatedCategory = categories.find(cat => cat.categoryId === categoryId);
        if (updatedCategory) {
            updateCategory({ ...updatedCategory, color: newColor });

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

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setSelectedCategory(null); // Ukrycie palety, gdy kliknięcie jest poza nią
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Grid templateColumns="20px 1fr" gap={4}>
            {categories && categories.length > 0 ? (
                categories.map(category => (
                    <React.Fragment key={category.categoryId}>
                        <GridItem>
                            <Popover>
                                <PopoverTrigger>
                                    <Icon
                                        viewBox="0 0 200 200"
                                        color={category.color || 'gray.400'}
                                        boxSize={4}
                                        cursor="pointer"
                                        onClick={() => setSelectedCategory(category.categoryId)}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                        />
                                    </Icon>
                                </PopoverTrigger>
                                {selectedCategory === category.categoryId && (
                                    <PopoverContent width="225px" maxWidth="225px">
                                        <PopoverArrow />

                                        <ChromePicker
                                            previousColor={category.color}
                                            onColorSelect={(newColor) => handleColorChange(category.categoryId, newColor)}
                                        />
                                    </PopoverContent>
                                )}
                            </Popover>
                        </GridItem>
                        <GridItem>
                            <CategorySettings category={category} />
                        </GridItem>
                    </React.Fragment>
                ))
            ) : (
                <GridItem colSpan={2}>No categories available</GridItem>
            )}
        </Grid>
    );
};

export default ColorPoints;

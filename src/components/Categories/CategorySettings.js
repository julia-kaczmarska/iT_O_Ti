import React from 'react';
import { Editable, EditableInput, EditablePreview, Tooltip, Box } from '@chakra-ui/react';
import { useCategories } from './CategoriesContext';

const CategorySettings = ({ category }) => {
    const { updateCategory } = useCategories();

    // Zabezpieczenie przed nieprawidłowym category
    if (!category) {
        return null;
    }

    const handleUpdateTitle = async (newTitle) => {
        const updatedCategory = { ...category, title: newTitle };
        updateCategory(updatedCategory);

        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');

            await fetch(`http://localhost:8080/user/${userId}/category/${category.categoryId}/title`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });
        } catch (error) {
            console.error("Error updating title in database:", error);
        }
    };

    return (
        <Box>
            {/* Edycja tytułu */}
            <Editable
                defaultValue={category.title}
                onSubmit={handleUpdateTitle}
            >
                <Tooltip label="Click to edit title">
                    <EditablePreview py={1} px={2} />
                </Tooltip>
                <EditableInput py={1} px={2} />
            </Editable>
        </Box>
    );
};

export default CategorySettings;

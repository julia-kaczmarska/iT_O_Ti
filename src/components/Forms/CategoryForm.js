import React, { useState } from 'react';
import ChromePicker from '../Categories/ChromePicker';
import {Box, Text, Button, FormControl, FormLabel, Input, VStack} from "@chakra-ui/react";
import {useThemeContext} from "../../themes/ThemeContext";
import {useModal} from "../../contexts/ModalContext";
import {useCategories} from "../../contexts/CategoriesContext";

const CategoryForm = ({ category, refreshCategories }) => {
    const {fetchCategories} = useCategories();
    const {closeModal} = useModal();
    const activeColorTheme = useThemeContext();
    const [title, setTitle] = useState(category ? category.title : '');
    const [color, setColor] = useState(category ? category.color : '#000000');  // Ustaw domyślny kolor jeśli kategoria nie ma koloru

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token found');
            localStorage.clear();
            window.location.href = '/auth/login';
        }

        const userId = localStorage.getItem("userId");
        const newCategory = { title, color };

        fetch(`http://localhost:8080/user/${userId}/addcategory`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Category added:', data);
                fetchCategories();
                closeModal();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired={true}>
                        <FormLabel>Category title</FormLabel>
                            <Input
                                bg='white'
                                type="text"
                                name='title'
                                value={title}
                                placeholder='Enter category title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                    </FormControl>
                    <Text size='xl'>Category color</Text>
                    <ChromePicker previousColor={color} onColorSelect={setColor} />
                </VStack>
            </form>
            <Button onClick={handleSubmit}>Create</Button>
        </Box>
    );
};

export default CategoryForm;

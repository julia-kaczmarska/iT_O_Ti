import React, { useEffect, useState } from 'react';
import {
    Box, Input, Tooltip,
    UnorderedList, useEditableControls, ButtonGroup, IconButton, Icon, Editable, ListItem, SimpleGrid, Flex
} from '@chakra-ui/react';
import {
    EditablePreview, EditableInput
} from '@chakra-ui/react';
import {CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useThemeContext } from "../../themes/ThemeContext";

const Categories = () => {
    const { activeColorTheme } = useThemeContext();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No token found');
                    localStorage.clear();
                    window.location.href = '/auth/login';
                }

                const userId = localStorage.getItem('userId');

                const response = await fetch(`http://localhost:8080/user/${userId}/categories`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error(`HTTP error: ${response.status}`);
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleUpdateCategory = async (categoryId, newTitle) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/user/${userId}/category/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            const updatedCategory = await response.json();
            setCategories(categories.map(category => category.categoryId === categoryId ? updatedCategory : category));
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : null;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box mb = {3}>
            <UnorderedList>
                {categories.map((category) => (
                    <Flex key={category.categoryId} columns={4} spacing={0} alignItems="center">
                        <Icon viewBox='0 0 200 200' color={activeColorTheme.colors[2]} boxSize={4}>
                            <path
                                fill='currentColor'
                                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                            />
                        </Icon>
                        <Editable
                            defaultValue={category.title}
                            isPreviewFocusable={true}
                            selectAllOnFocus={false}
                            onSubmit={(newTitle) => handleUpdateCategory(category.categoryId, newTitle)}
                        >
                            <Flex alignItems="center">
                                <Tooltip label='Click to edit' shouldWrapChildren={true}>
                                    <EditablePreview
                                        py={1}
                                        px={2}
                                    />
                                </Tooltip>
                                <Input py={1} px={2} as={EditableInput} />
                                <EditableControls />
                            </Flex>
                        </Editable>
                    </Flex>
                ))}
            </UnorderedList>
        </Box>
    );
};

export default Categories;

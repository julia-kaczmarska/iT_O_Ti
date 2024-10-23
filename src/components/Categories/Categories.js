import React, { useEffect, useState } from 'react';
import {
    Box, Input,
    ListItem, Tooltip,
    UnorderedList, useColorModeValue, useEditableControls
} from '@chakra-ui/react'
import {
    EditablePreview,
    IconButton,
    ButtonGroup,
    Editable,
    EditableInput,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {useThemeContext} from "../../themes/ThemeContext";


const Categories = () => {
    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu
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

                const response = await fetch(`http://localhost:8080/user/${userId}/cats`, {
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton
                    icon={<CloseIcon boxSize={3} />}
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        ) : null
    }

    return (
        <Box>
            <UnorderedList>

                {categories.map((category) => (
                    <ListItem key={category.categoryId}>
                        <Editable
                            defaultValue={category.title}
                            isPreviewFocusable={true}
                            selectAllOnFocus={false}
                        />
                    </ListItem>
                ))}

                <Tooltip label='Click to edit' shouldWrapChildren={true}>
                    <EditablePreview
                        bg={activeColorTheme.colors[3]}
                        py={2}
                        px={4}
                    />
                </Tooltip>
                <Input py={2} px={4} as={EditableInput} />
                <EditableControls />
            </UnorderedList>
        </Box>



    );
};

export default Categories;

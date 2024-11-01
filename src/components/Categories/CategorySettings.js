import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    UnorderedList,
    Flex,
    Icon,
    Editable,
    Tooltip,
    EditablePreview,
    Input,
    useEditableControls,
    ButtonGroup,
    IconButton,
    EditableInput
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useThemeContext } from "../../themes/ThemeContext";
import BlockColorPicker from './BlockColorPicker'; // Importujemy komponent BlockColorPicker

const CategorySettings = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const { activeColorTheme } = useThemeContext();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
    const pickerRef = useRef(null);

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
            const response = await fetch(`http://localhost:8080/user/${userId}/category/${categoryId}/title`, {
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

    const handleUpdateCategoryColor = async (categoryId, newColor) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/user/${userId}/category/${categoryId}/color`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ color: newColor }),
            });

            if (!response.ok) {
                throw new Error('Failed to update category color');
            }

            const updatedCategory = await response.json();
            setCategories(categories.map(category => category.categoryId === categoryId ? updatedCategory : category));
        } catch (error) {
            console.error('Error updating category color:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setSelectedCategory(null); // Hide picker if clicking outside
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : null;
    };

    return (
        <Box mb={3}>
            <UnorderedList mb={1}>
                {categories.map((category) => (
                    <Flex key={category.categoryId} alignItems="center" mb={2}>
                        <Icon
                            viewBox='0 0 200 200'
                            color={category.color || activeColorTheme.colors[2]} // Używamy koloru kategorii
                            boxSize={4}
                            mr={2}
                            onClick={() => setSelectedCategory(category.categoryId)} // Ustawienie wybranej kategorii po kliknięciu
                            cursor="pointer"
                        >
                            <path
                                fill='currentColor'
                                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                            />
                        </Icon>
                        <Editable
                            defaultValue={category.title}
                            isPreviewFocusable={true}
                            onSubmit={(newTitle) => handleUpdateCategory(category.categoryId, newTitle)}
                        >
                            <Tooltip label='Click to edit' shouldWrapChildren={true}>
                                <EditablePreview py={1} px={2} />
                            </Tooltip>
                            <Input py={1} px={2} as={EditableInput} />
                            <EditableControls />
                        </Editable>
                    </Flex>
                ))}
            </UnorderedList>

            {/* Wyświetlenie BlockColorPicker, gdy wybrana jest kategoria */}
            {selectedCategory && (
                <Box ref={pickerRef}
                     position="absolute"
                     top={`${pickerPosition.top}px`}
                     left={`${pickerPosition.left}px`}
                     zIndex={1000}
                     bg="white"
                     p={2}
                     boxShadow="md"
                     borderRadius="md"
                     border="1px solid #e2e8f0">
                    <BlockColorPicker
                        color={categories.find(cat => cat.categoryId === selectedCategory).color}
                        onChange={(color) => {
                            handleUpdateCategoryColor(selectedCategory, color.hex);
                            setSelectedCategory(null); // Ukrycie pickera po wyborze koloru
                        }}
                    />
                    <Box
                        position="absolute"
                        top="-8px"
                        left="50%"
                        transform="translateX(-50%)"
                        width="0"
                        height="0"
                        borderLeft="8px solid transparent"
                        borderRight="8px solid transparent"
                        borderBottom="8px solid #e2e8f0"
                    />
                </Box>
            )}
        </Box>
    );
};

export default CategorySettings;

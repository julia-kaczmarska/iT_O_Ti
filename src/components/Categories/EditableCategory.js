import React, { useState } from 'react';
import {
    Editable,
    EditableInput,
    EditablePreview,
    Tooltip,
    Flex,
    IconButton,
    VStack, useEditableControls,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useCategories } from '../../contexts/CategoriesContext';
import MyAlertDialog from '../MyButtons/MyAlertDialog';

const EditableCategory = ({ category }) => {
    const { updateCategory, deleteCategory } = useCategories();
    const [isDialogOpen, setDialogOpen] = useState(false); // Dodajemy stan dialogu

    const handleDeleteCategory = () => {
        deleteCategory(category.categoryId);
        setDialogOpen(false); // Zamknięcie dialogu po usunięciu
    };

    if (!category) {
        return null;
    }

    const EditableControls = () => {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <Flex justifyContent="flex-end" gap={2} mt={2}>
                <IconButton
                    aria-label="Confirm edit"
                    icon={<CheckIcon />}
                    size="sm"
                    {...getSubmitButtonProps()}
                />
                <IconButton
                    aria-label="Cancel edit"
                    icon={<CloseIcon />}
                    size="sm"
                    {...getCancelButtonProps()}
                />
                <IconButton
                    aria-label="Delete category"
                    icon={<DeleteIcon />}
                    size="sm"
                    onMouseDown={() => setDialogOpen(true)} // Otwieranie dialogu
                    disabled={true}
                />
            </Flex>
        ) : null;
    };

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
            console.error('Error updating title in database:', error);
        }
    };

    return (
        <VStack align="start" spacing={2}>
            <Editable
                defaultValue={category.title}
                isPreviewFocusable={true}
                onSubmit={handleUpdateTitle}
            >
                <Tooltip label="Click to edit title" shouldWrapChildren={true}>
                    <EditablePreview
                        py={2}
                        px={4}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        minH="40px"
                        display="flex"
                        alignItems="center"
                    />
                </Tooltip>
                <EditableInput
                    py={2}
                    px={4}
                    border="1px solid"
                    borderColor="blue.300"
                    borderRadius="md"
                    minH="40px"
                    display="flex"
                    alignItems="center"
                />
                <EditableControls />
            </Editable>

            <MyAlertDialog
                isOpen={isDialogOpen} // Przekazanie stanu otwarcia dialogu
                onClose={() => setDialogOpen(false)} // Funkcja zamykająca dialog
                onConfirm={handleDeleteCategory} // Funkcja potwierdzająca usunięcie
                title="Delete Category"
                description={`Are you sure you want to delete the category "${category.title}"?`}
            />
        </VStack>
    );
};

export default EditableCategory;

import React from 'react';
import {
    Editable,
    EditableInput,
    EditablePreview,
    Tooltip,
    Box,
    useEditableControls,
    ButtonGroup, IconButton
} from '@chakra-ui/react';
import { useCategories } from './CategoriesContext';
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";

const CategorySettings = ({ category }) => {
    const { updateCategory } = useCategories();

    // Zabezpieczenie przed nieprawidłowym category
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
            <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
                {/*przycisk usuwający kategorię?*/}
            </ButtonGroup>
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
            console.error("Error updating title in database:", error);
        }
    };

    return (
        <Box>
            <Editable
                defaultValue={category.title}
                isPreviewFocusable={true}
                onSubmit={handleUpdateTitle}
            >
                <Tooltip label="Click to edit title" shouldWrapChildren={true}>
                    <EditablePreview py={1} px={2} />
                </Tooltip>
                <EditableInput py={1} px={2} />
                <EditableControls />

            </Editable>
        </Box>
    );
};

export default CategorySettings;

import React, { useState } from 'react';
import { IconButton } from "@chakra-ui/react";
import MyAlertDialog from './MyAlertDialog';
import { DeleteIcon } from "@chakra-ui/icons";
import { useThemeContext } from "../../themes/ThemeContext";

const DeleteButton = ({ recordIds, onDelete }) => {
    const { activeColorTheme } = useThemeContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        try {
            // Upewnij się, że wysyłamy zawsze tablicę
            const recordIdArray = Array.isArray(recordIds) ? recordIds : [recordIds];

            const response = await fetch(`http://localhost:8080/user/${userId}/records`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recordIdArray), // Wysyłamy zawsze tablicę
            });

            if (response.ok) {
                console.log(`Record(s) with ID(s) ${recordIdArray} deleted successfully.`);
                if (onDelete) onDelete(recordIdArray); // Wywołujemy callback, jeśli jest
                setIsDialogOpen(false);
            } else {
                console.error(`Failed to delete record(s): ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting record(s):", error);
        }
    };

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    return (
        <>
            <IconButton
                icon={<DeleteIcon />}
                bg={activeColorTheme.colors[4]}
                onClick={handleOpenDialog}
            />

            <MyAlertDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleDelete}
                title="Delete Records"
                description={`Are you sure you want to delete ${
                    Array.isArray(recordIds) ? recordIds.length : 1
                } record(s)? This action cannot be undone.`}
            />
        </>
    );
};

export default DeleteButton;

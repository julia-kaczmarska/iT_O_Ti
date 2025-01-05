import React, { useState } from 'react';
import { IconButton } from "@chakra-ui/react";
import MyAlertDialog from './MyAlertDialog';
import {DeleteIcon} from "@chakra-ui/icons";

const DeleteButton = ({ recordId, onDelete }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');


        try {
            const response = await fetch(`http://localhost:8080/user/${userId}/records/${recordId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log(`Record with id ${recordId} deleted successfully.`);
                onDelete(recordId);
                setIsDialogOpen(false);
            } else {
                console.error(`Failed to delete record: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    return (
        <>
            <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Delete Record"
                onClick={handleOpenDialog}
            />

            <MyAlertDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleDelete}
                title="Delete Record"
                description="Are you sure you want to delete this record? This action cannot be undone."
            />
        </>
    );
};

export default DeleteButton;

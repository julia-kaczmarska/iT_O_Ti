import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Box, Grid
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import CategoryForm from "../Forms/CategoryForm";
import RecordForm from "../Forms/RecordForm";
import CategorySettings from "../Categories/CategorySettings";
import ColorPoints from "../Categories/ColorPoints";
import OpenModalButton from "./OpenModalButton";
import Buttons from "./Buttons";

const MyModal = ({ isOpen, onClose, content, placeholderDate}) => {
    const [modalLabel, setModalLabel] = useState(content ? content : null)
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        // setModalLabel(content)
        switch (content) {
            case 'Category settings':
                setModalContent(
                    <Box>
                        <Grid columns="repeat(2, 1fr)" gap={1}>
                            <ColorPoints />
                            <CategorySettings />
                        </Grid>
                        <Buttons label={"Add category"}/>
                    </Box>
                );
                break;
            case 'Add category':
                setModalContent(
                    <CategoryForm
                        isEdit={false}
                    />
                );
                break;
            case '+':
                setModalLabel('Add record')
                setModalContent(
                    <RecordForm
                        isEdit={false}
                        placeholderDate={placeholderDate}
                        // existingRecord={existingRecord}
                        // onClose={handleClose} // Funkcja zamykająca okno
                        // onRecordSaved={handleRecordSaved} // Funkcja wywoływana po zapisaniu rekordu
                    />
                );
                break;
            default:
                console.log(`Unknown content type: ${content}`);
                break;
        }
    }, [content]);

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalLabel}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modalContent}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default MyModal;

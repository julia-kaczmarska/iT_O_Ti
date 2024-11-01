import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Box
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import CategoryForm from "./Forms/CategoryForm";
import RecordForm from "./Forms/RecordForm";
import CategorySettings from "./Categories/CategorySettings";
import Categories from "./Categories/Categories";
import OpenModalButton from "./MyButtons/OpenModalButton";

const MyModal = ({ isOpen, onClose, content }) => {
    const [modalLabel, setModalLabel] = useState(null)
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        setModalLabel(content)
        switch (content) {
            case 'Category settings':
                setModalContent(
                    <Box>
                    <CategorySettings />
                    <OpenModalButton label={"Add category"}/>
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
            case 'Add record':
                setModalContent(
                    <RecordForm
                        isEdit={false}
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

                {/*<ModalFooter>*/}
                {/*    /!*<Button colorScheme='blue' mr={3} onClick={onClose}>*!/*/}
                {/*    /!*    Close*!/*/}
                {/*    /!*</Button>*!/*/}
                {/*    /!*<Button variant='ghost'>Secondary Action</Button>*!/*/}
                {/*</ModalFooter>*/}
            </ModalContent>
        </Modal>
    );
}

export default MyModal;

import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {useModal} from "../../contexts/ModalContext";

const MyModal = ({ children, label }) => {
    const { closeModal } = useModal();

    return (
        <Modal onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{label}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MyModal;

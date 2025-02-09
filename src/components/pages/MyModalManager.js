import React, { memo } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import MODAL_CONFIG from './MODAL_CONFIG';
import { useModal } from '../../contexts/ModalContext';

const MyModalManager = () => {
    const { modalType, modalProps = {}, closeModal } = useModal();
    const config = MODAL_CONFIG[modalType];
    if (!config) return null;

    // Dynamiczna szerokość modala
    const modalSize = modalType === 'AddBudgetPlan' ? '6xl' : 'md';

    return (
        <Modal isOpen={!!modalType} onClose={closeModal} size={modalSize}>
            <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
            <ModalContent>
                <ModalHeader>{config.label}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {typeof config.content === 'function'
                        ? config.content(modalProps)
                        : config.content}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MyModalManager;

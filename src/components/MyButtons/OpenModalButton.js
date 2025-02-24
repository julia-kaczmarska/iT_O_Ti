import React from 'react';
import { Box } from '@chakra-ui/react';
import { useModal } from '../../contexts/ModalContext';
import Buttons from "./Buttons";
import MyModalManager from "../pages/MyModalManager";

const OpenModalButton = ({ modalType, modalProps, label, fitToParent }) => {
    const { openModal } = useModal();

    return (
        <Box w="100%" h="100%">
            <Buttons
                onClick={() => openModal(modalType, modalProps)}
                label={label}
                fitToParent={fitToParent}
            />
            <MyModalManager/>
        </Box>
    );
};

export default OpenModalButton;
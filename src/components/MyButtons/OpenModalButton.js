import {Box, Button, useDisclosure} from "@chakra-ui/react";
import MyModal from "../MyModal";
import React, {useState} from "react";

const OpenModalButton = ({label}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const openModal = () => {
        onOpen();
    };


    return(
        <Box>
            <Button onClick={() => openModal()}>
                {label}
            </Button>
            <MyModal isOpen={isOpen} onClose={onClose} content={label}/>
        </Box>
);

}

export default OpenModalButton;



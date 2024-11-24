import {Box, Button, useDisclosure} from "@chakra-ui/react";
import MyModal from "../MyModal";
import React, {useState} from "react";
import {useThemeContext} from "../../themes/ThemeContext";
import Buttons from "./Buttons";

 const OpenModalButton = ({label, placeholderDate}) => {
     const { isOpen, onOpen, onClose } = useDisclosure()

     const openModal = () => {
         onOpen();
    };

    return(
        <Box>
            <Buttons onClick={() => openModal()} label={label}/>
            <MyModal isOpen={isOpen} onClose={onClose} content={label} placeholderDate={placeholderDate}/>
        </Box>
);

}
export default OpenModalButton



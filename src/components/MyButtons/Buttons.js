import {background, Box, Button, useDisclosure} from "@chakra-ui/react";
import MyModal from "./MyModal";
import React, {useState} from "react";
import {useThemeContext} from "../../themes/ThemeContext";

const Buttons = ({onClick, label, type = 'primary', variant = 'solid'}) => {
    const { activeColorTheme } = useThemeContext();

    const color = type === 'primary' ? activeColorTheme.colors[3] : activeColorTheme.colors[4];
    const hov = type === 'primary' ? activeColorTheme.colors[4] : activeColorTheme.colors[3];


    return(
        <Button
            variant={variant}
            onClick={onClick}
            bg={color}
            _hover={{backgroundColor: hov}}
            m={5}
        >
            {label}
        </Button>
    );

}
export default Buttons;



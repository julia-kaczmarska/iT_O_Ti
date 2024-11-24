import {Box, Button, useDisclosure} from "@chakra-ui/react";
import MyModal from "../MyModal";
import React, {useState} from "react";
import {useThemeContext} from "../../themes/ThemeContext";

const Buttons = ({onClick, label, type = 'primary'}) => {
    const { activeColorTheme } = useThemeContext();

    const color = type === 'primary' ? activeColorTheme.colors[3] : activeColorTheme.colors[4];

    return(
        <Button
            onClick={onClick}
            bg={color}
            m={5}
        >
            {label}
        </Button>
    );

}
export default Buttons;



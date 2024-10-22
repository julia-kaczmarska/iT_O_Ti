import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import {useThemeContext} from "../../../themes/ThemeContext";

const PlusButton = ({ }) => {

    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu

    const openRecorfForm = () => {

    }

    return (
        <Button
            m='3'
            onClick={openRecorfForm}
            bg={activeColorTheme.colors[1]}
            color={activeColorTheme.colors[6]}
            _hover={{ bg: activeColorTheme.colors[4] }}
        >
            +
        </Button>
    );
};

export default PlusButton;

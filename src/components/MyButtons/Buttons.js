import { Button } from "@chakra-ui/react";
import React from "react";
import { useThemeContext } from "../../themes/ThemeContext";

const Buttons = ({ onClick, label, type = 'primary', variant = 'solid', fitToParent = false }) => {
    const { activeColorTheme } = useThemeContext();

    const color = type === 'primary' ? activeColorTheme.colors[3] : activeColorTheme.colors[4];
    const hov = type === 'primary' ? activeColorTheme.colors[4] : activeColorTheme.colors[3];

    return (
        <Button
            variant={variant}
            onClick={onClick}
            bg={color}
            _hover={{ backgroundColor: hov }}
            w={fitToParent ? "100%" : "auto"} // Dopasowanie szerokości
            h={fitToParent ? "100%" : "auto"} // Dopasowanie wysokości
            p={fitToParent ? 0 : 3}          // Bez wewnętrznego odstępu, jeśli fitToParent
        >
            {label}
        </Button>
    );
};

export default Buttons;


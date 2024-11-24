import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import OpenModalButton from "../../MyButtons/OpenModalButton";

const DateCellWrapper = ({ children, value }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Box
            position="relative"
            width="100%"
            height="100%"
            border="1px solid transparent"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Nakładka na całą komórkę */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex="5"
                pointerEvents={hovered ? "none" : "auto"}
            />

            {/* Cała komórka kalendarza */}
            {children}

            {/* Przyciski wyświetlane na hover */}
            {hovered && (
                <Box
                    position="absolute"
                    top="5px"
                    right="5px"
                    zIndex="10"
                    onMouseEnter={() => setHovered(true)}
                >
                    <OpenModalButton label="+" type='secondary' placeholderDate={value}/>
                </Box>
            )}
        </Box>
    );
};

export default DateCellWrapper;

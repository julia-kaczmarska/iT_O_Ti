import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import OpenModalButton from "../../MyButtons/OpenModalButton";
import moment from "moment";

const DateCellWrapper = ({ children, value }) => {
    const [hovered, setHovered] = useState(false);

    console.log("Value received in DateCellWrapper:", value);

    // Wymuszenie lokalnej daty
    const localDate = new Date(value);

    console.log("Local date interpreted:", localDate);

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

             {/*Przyciski wyświetlane na hover*/}
            {hovered && (
                <Box
                    position="absolute"
                    top="5px"
                    right="5px"
                    zIndex="2"
                    onMouseEnter={() => setHovered(true)}
                >
                    <OpenModalButton label="+" type="secondary" placeholderDate={localDate} />
                </Box>
            )}
        </Box>
    );
};


export default DateCellWrapper;
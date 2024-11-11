import React, {useEffect, useState} from 'react';
import {Badge, Box, Text} from "@chakra-ui/react";

const MyEventComponent = ({ category, event }) => {
    const [catColor, setCatColor] = useState("");

    useEffect(() => {
        if (category && category.categoryId === event.categoryId) {
            setCatColor(category.color);
        } else {
            setCatColor(""); // Resetuje kolor, jeśli kategoria się nie zgadza
        }
    }, [category, event]); // Dodano `event` do zależności, aby reagować na zmiany w `event`

    return (
        <Box backgroundColor={catColor}>
            <Text fontSize="xs">
                {event.desc}
                -{event.amount}
            </Text>
        </Box>
    );
}

export default MyEventComponent;

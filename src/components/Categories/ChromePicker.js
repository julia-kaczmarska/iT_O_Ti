import React from 'react';
import Chrome from "@uiw/react-color-chrome";

export default function ChromePicker({ previousColor, onColorSelect }) {
    return (
        <Chrome
            color={previousColor || "#000000"}
            onChange={(color) => {
                if (onColorSelect) {
                    onColorSelect(color.hex); // Przekazanie wybranego koloru do rodzica
                }
            }}
        />
    );
}

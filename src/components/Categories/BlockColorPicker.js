import React, { useState } from 'react';
import Block from '@uiw/react-color-block';

export default function BlockColorPicker({ previousColor, onColorSelect }) {
    const [hex, setHex] = useState(previousColor || "#000000");

    return (
            <Block
                triangle = "hide"
                colors={["#79542F","#CC4949","#D68432","#DBA227","#E0BF1B","#BDBC47","#9AB973","#53B3CB","#445997","#7B5187"]}
                color={hex}
                onChange={(color) => {
                    setHex(color.hex);
                    onColorSelect(color.hex); // Wywołanie funkcji po wyborze koloru
                }}
            />

    );
}

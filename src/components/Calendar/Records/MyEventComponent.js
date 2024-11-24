import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import {useCategories} from "../../../contexts/CategoriesContext";



const MyEventComponent = ({ event }) => {
    const { categories } = useCategories();
    const [catColor, setCatColor] = useState('');

    useEffect(() => {

        const matchingCategory = categories.find(
            (category) => category.categoryId === event.categoryId
        );

        if (matchingCategory) {
            setCatColor(matchingCategory.color);
        } else {
            setCatColor('#ffffff');
        }
    }, [categories, event]);

    return (
        <Popover>
            <PopoverTrigger>
                <div
                    style={{
                        backgroundColor: catColor, // Zmiana tła całego elementu
                        color: '#fff', // Kolor tekstu, aby był widoczny na ciemnym tle
                        borderRadius: '5px', // Opcjonalnie: zaokrąglone rogi
                        padding: '5px', // Opcjonalnie: padding wewnętrzny
                        height: '100%', // Wypełnia całą przestrzeń eventu
                        display: 'flex', // Wyśrodkowanie tekstu
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text fontSize="xs" _focus={{
                        boxShadow: 'none', // Usuwa domyślny focus outline
                    }}>
                        {/*{event.desc}*/}
                        - {event.amount}
                    </Text>
                </div>
            </PopoverTrigger>
            <PopoverContent
                bg={catColor}
                border="none"
                _focus={{
                    boxShadow: 'none', // Usuwa focus z PopoverContent
                }}
                >
                <PopoverArrow bg={catColor}/>
                <PopoverBody>
                    {event.desc} - {event.amount}
                </PopoverBody>
            </PopoverContent>
        </Popover>

    );
}

export default MyEventComponent;

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
import MyModal from "../../MyButtons/MyModal";



const MyEventComponent = ({ event }) => {
    const { categories } = useCategories();
    const [catColor, setCatColor] = useState('');
    const [isModalOpen, setModalOpen] = useState(false); // Stan otwarcia modala
    const [modalContent, setModalContent] = useState(null); // Zawartość modala

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

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
        <Box>
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
                onClick={() => openModal('Category settings')} // Otwiera modal z zawartością "Category settings"
            >
                <PopoverArrow bg={catColor}/>
                <PopoverBody>
                    {event.desc} - {event.amount}
                </PopoverBody>
            </PopoverContent>
        </Popover>

    <MyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        placeholderDate={new Date()} // Przekazanie przykładowej daty
    />

    </Box>

    );
}

export default MyEventComponent;
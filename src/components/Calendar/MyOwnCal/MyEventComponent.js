import React, { useEffect, useState } from 'react';
import {
    Box,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import { useCategories } from "../../../contexts/CategoriesContext";
import MyModal from "../../MyButtons/MyModal";
import moment from "moment";

const MyEventComponent = ({ currentDay, currentMonth, currentYear }) => {
    const { categories } = useCategories();
    const [catColor, setCatColor] = useState('#ffffff');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEventsForDay = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const userId = localStorage.getItem('userId');
                const response = await fetch(`http://localhost:8080/user/${userId}/records`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                // Filtrowanie wydarzeń dla danego dnia
                const filteredEvents = data.filter(event => {
                    const eventDate = moment.utc(event.startDate).local().toDate();
                    return (
                        eventDate.getDate() === currentDay &&
                        eventDate.getMonth() === currentMonth &&
                        eventDate.getFullYear() === currentYear
                    );
                });

                // Konwertujemy daty na lokalny czas
                const formattedEvents = filteredEvents.map(event => ({
                    ...event,
                    start: moment.utc(event.startDate).local().toDate(),
                    end: moment.utc(event.startDate).local().toDate(),
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEventsForDay();
    }, [currentDay, currentMonth, currentYear]);

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    useEffect(() => {
        if (events.length > 0) {
            const matchingCategory = categories.find(
                (category) => category.categoryId === events[0].categoryId
            );
            setCatColor(matchingCategory ? matchingCategory.color : '#ffffff');
        }
    }, [categories, events]);

    if (events.length === 0) {
        return null;
    }

    return (
        <Box>
            <Popover>
                <PopoverTrigger>
                    <Box
                        style={{
                            backgroundColor: catColor,
                            color: '#fff',
                            borderRadius: '5px',
                            padding: '5px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text fontSize="xs">- {events[0].amount}</Text>
                    </Box>
                </PopoverTrigger>
                <PopoverContent
                    bg={catColor}
                    border="none"
                    onClick={() => openModal(events[0].desc)}
                >
                    <PopoverArrow bg={catColor} />
                    <PopoverBody>
                        {events[0].desc} - {events[0].amount}
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            <MyModal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={modalContent}
                placeholderDate={new Date()}
            />
        </Box>
    );
};

export default MyEventComponent;

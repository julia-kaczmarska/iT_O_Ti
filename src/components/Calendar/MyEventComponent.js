import React, { useEffect, useState } from 'react';
import {
    Box,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";
import { useCategories } from "../../contexts/CategoriesContext";
import moment from "moment";
import MyModalManager from "../pages/MyModalManager";
import {useModal} from "../../contexts/ModalContext";

const MyEventComponent = ({ currentDay, currentMonth, currentYear }) => {
    const { openModal, closeModal } = useModal();
    const { categories } = useCategories();
    const [catColor, setCatColor] = useState('#ffffff');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [events, setEvents] = useState([]);
    const [showMorePopover, setShowMorePopover] = useState(false);

    // const handleMoreClick = (records) => {
    //     setModalType('ShowMoreRecords');
    //     setModalProps({ records });
    // };

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

                const eventsByDay = data.reduce((acc, event) => {
                    const eventDate = moment.utc(event.startDate).local().format('YYYY-MM-DD');
                    if (!acc[eventDate]) {
                        acc[eventDate] = [];
                    }
                    acc[eventDate].push({
                        ...event,
                        start: moment.utc(event.startDate).local().toDate(),
                        end: moment.utc(event.startDate).local().toDate(),
                    });
                    return acc;
                }, {});

                const eventsArray = Object.entries(eventsByDay).map(([day, events]) => ({
                    day,
                    events,
                }));

                setEvents(eventsArray);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEventsForDay();
    }, [currentDay, currentMonth, currentYear]);

    // Find the events for the current day
    const formattedDate = moment(new Date(currentYear, currentMonth, currentDay)).format('YYYY-MM-DD');
    const dayEvents = events.find(event => event.day === formattedDate);

    useEffect(() => {
        if (dayEvents && dayEvents.events.length > 0) {
            const matchingCategory = categories.find(
                (category) => category.categoryId === dayEvents.events[0].categoryId
            );
            setCatColor(matchingCategory ? matchingCategory.color : '#ffffff');
        }
    }, [categories, dayEvents]);

    if (!dayEvents || dayEvents.events.length === 0) {
        return null;
    }

    return (
        <Box className='iteracja'>
            {dayEvents.events.slice(0, 2).map((event, index) => (
                <Popover key={index}>
                    <PopoverTrigger>
                        <Box
                            style={{
                                backgroundColor: catColor,
                                color: '#fff',
                                borderRadius: '5px',
                                margin: '2px',
                                padding: '5px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text fontSize="xs">-{event.amount}</Text>
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent
                        bg={catColor}
                        border="none"
                    >
                        <PopoverArrow bg={catColor} />
                        <PopoverBody>
                            <Box
                                onClick={() => {
                                    openModal('EditRecord', { existingRecord: event })}
                                }
                                style={{ marginBottom: '5px', cursor: 'pointer' }}
                            >
                                {event.desc} - {event.amount}
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            ))}

            {dayEvents.events.length > 2 && (
                <Popover>
                    <PopoverTrigger>
                        <Box
                            style={{
                                backgroundColor: '#ccc',
                                color: '#000',
                                borderRadius: '5px',
                                margin: '2px',
                                padding: '5px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Text fontSize="xs">
                                +{dayEvents.events.length - 2}
                            </Text>
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent
                        // bg={catColor}
                        border="none"
                    >
                        <PopoverArrow />
                        <PopoverBody>
                            <Box
                                h='115px'
                                >
                                {dayEvents.events.slice(2).map((event, index) => (
                                        <Box
                                            key={index}
                                            style={{
                                                backgroundColor: catColor,
                                                color: '#fff',
                                                borderRadius: '5px',
                                                margin: '2px',
                                                padding: '5px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text fontSize="xs">-{event.amount}</Text>
                                        </Box>
                                    ))}
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            )}

            <MyModalManager
                isOpen={isModalOpen}
                onClose={closeModal}
                content={modalContent}
                // existingRecord={}
            />
        </Box>
    );

};

export default MyEventComponent;
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import MyEventComponent from "./MyOwnCal/MyEventComponent";
import {Box} from "@chakra-ui/react";
import DateCellWrapper from "./Records/DateCellWrapper";
import {useThemeContext} from "../../themes/ThemeContext";
import MyModal from "../MyButtons/MyModal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


const localizer = momentLocalizer(moment);

const MyCalendar = ({ currentMonth }) => {
    const DnDCalendar = withDragAndDrop(Calendar);
    const [events, setEvents] = useState([]);
    const { activeColorTheme } = useThemeContext();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDate(null);
    };

    useEffect(() => {
        const fetchEventsForMonth = async () => {
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

                // Konwertujemy start i end na Date
                const formattedEvents = data.map(event => ({
                    ...event,
                    start: moment.utc(event.startDate).local().toDate(), // Konwersja z UTC na lokalny czas
                    end: moment.utc(event.startDate).local().toDate()    // To samo dla `end`
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEventsForMonth();
    }, [currentMonth]);

    const handleSelectSlot = slotInfo => {
        setSelectedDate(slotInfo.start);
    };

    return (
        <Box className="calendar-page" sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={new Date(currentMonth)}
                getNow={() => new Date()} // Użycie bieżącego czasu lokalnego
                selectable
                onSelectSlot={handleSelectSlot}
                components={{
                    event: MyEventComponent,
                    toolbar: () => null, // Ukrycie paska narzędzi
                    dateCellWrapper: DateCellWrapper,
                }}
            />

            <MyModal
                isOpen={isModalOpen}
                onClose={closeModal}
                content="Add record"
                placeholderDate={selectedDate}
            />
        </Box>
    );
};

export default MyCalendar;
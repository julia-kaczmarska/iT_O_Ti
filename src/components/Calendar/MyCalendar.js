import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import MyEventComponent from "./Records/MyEventComponent";
import {Box} from "@chakra-ui/react";
import DateCellWrapper from "./Records/DateCellWrapper";
import {useThemeContext} from "../../themes/ThemeContext";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ currentMonth }) => {
    const [events, setEvents] = useState([]);
    const { activeColorTheme } = useThemeContext();

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

    return (
        <Box className="calendar-page" sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={new Date(currentMonth)}
                getNow={() => new Date()} // Użycie bieżącego czasu lokalnego
                components={{
                    event: MyEventComponent,
                    toolbar: () => null, // Ukrycie paska narzędzi
                    dateCellWrapper: DateCellWrapper,
                }}
            />
        </Box>
    );
};

export default MyCalendar;

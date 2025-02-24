import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import moment from "moment";
import DayEvent from "./DayEvent";
import MoreEventsPopover from "./MoreEventsPopover";

const EventsManager = ({ currentDay, currentMonth, currentYear, setRefreshEvents }) => {
    const [events, setEvents] = useState([]);

    const refreshEvents = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/user/${userId}/expenses?monthStartDate=${formattedDate}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            const eventsByDay = data.reduce((acc, event) => {
                const eventDate = moment(event.startDate).format('YYYY-MM-DD');
                if (!acc[eventDate]) {
                    acc[eventDate] = [];
                }
                acc[eventDate].push({
                    ...event,
                    start: new Date(event.startDate),
                    end: new Date(event.startDate),
                });
                return acc;
            }, {});

            const eventsArray = Object.entries(eventsByDay).map(([day, events]) => ({
                day,
                events,
            }));

// Ustawienie nowej referencji do stanu
            setEvents([...eventsArray]);
        } catch (error) {
            console.error('Error refreshing events:', error);
        }
    };

// Dodajemy useEffect z zależnością na refreshEvents
    useEffect(() => {
        refreshEvents();
    }, [refreshEvents]);

// Ustawienie refreshEvents w CalendarGrid jako callback
    useEffect(() => {
        setRefreshEvents(() => refreshEvents);
    }, [setRefreshEvents]); // Użycie useEffect, aby nie nadpisywać przy każdym renderze

    useEffect(() => {
        refreshEvents();
    }, [currentDay, currentMonth, currentYear]);

    const formattedDate = moment(new Date(currentYear, currentMonth, currentDay)).format('YYYY-MM-DD');
    const dayEvents = events.find(event => event.day === formattedDate);

    if (!dayEvents || dayEvents.events.length === 0) {
        return null;
    }

    return (
        <Box>
            {dayEvents.events.slice(0, 2).map((event, index) => (
                <DayEvent key={index} event={event} refreshEvents={refreshEvents} fetchBudgetData={fetchBudgetData}/>
            ))}
            {dayEvents.events.length > 2 && (
                <MoreEventsPopover events={dayEvents.events.slice(2)} refreshEvents={refreshEvents}/>
            )}
        </Box>
    );
};


export default EventsManager;
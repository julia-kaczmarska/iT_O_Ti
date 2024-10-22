import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import MyEventComponent from "./Records/MyEventComponent";
import {jwtDecode} from "jwt-decode";

const localizer = momentLocalizer(moment);


const MyCalendar = ({currentMonth}) => {
    const [events, setEvents] = useState([
        {
            title: 'Sample Event',
            start: new Date(),
            end: new Date(),
        },
    ]);

    // useEffect(() => {
    //
    //     const fetchEventsForMonth = async () => {
    //         try {
    //             const startOfMonth = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
    //             const endOfMonth = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
    //
    //             // Zakładam, że masz API, które zwraca wydarzenia w podanym zakresie dat
    //             const response = await fetch(`/user/${userId}/events?start=${startOfMonth}&end=${endOfMonth}`);
    //             const data = await response.json();
    //
    //             // Aktualizujemy stan wydarzeń
    //             setEvents(data);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //         }
    //     };
    //
    //     fetchEventsForMonth();
    // }, [currentMonth]);

    return (
        <div className="calendar-page">
            <Calendar
                localizer={localizer}
                // events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentMonth}
                onSelectEvent={() => {}}
                onSelectSlot={() => {}}
                selectable={false}
                onDrillDown={() => {}} // Ignoruje kliknięcie na dzień

                components={{
                    event: MyEventComponent,
                    toolbar: () => null, // Hide toolbar

                }}
            />
        </div>
    );
};

export default (MyCalendar);

import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import MyEventComponent from "./Records/MyEventComponent";
import MyToolbar from "./MyToolbar";
import MyNavigation from "./MyNavigation";

const localizer = momentLocalizer(moment);

const MyCalendar = ({currentMonth}) => {
    const [events, setEvents] = useState([
        // {
        //     title: 'Sample Event',
        //     start: new Date(),
        //     end: new Date(),
        // },
    ]);

    // useEffect(() => {
    //     const fetchEventsForMonth = async () => {
    //         try {
    //             const startOfMonth = moment(currentMonth).startOf('month').format('YYYY-MM-DD');
    //             const endOfMonth = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
    //
    //             // Zakładam, że masz API, które zwraca wydarzenia w podanym zakresie dat
    //             // const response = await fetch(`/api/events?start=${startOfMonth}&end=${endOfMonth}`);
    //             // const data = await response.json();
    //
    //             // Aktualizujemy stan wydarzeń
    //             // setEvents(data);
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
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentMonth}
                components={{
                    event: MyEventComponent, toolbar: null, navigation: MyNavigation
                }}
            />
        </div>
    );
};

export default (MyCalendar);

import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import MyEventComponent from "./Records/MyEventComponent";
import MyToolbar from "./MyToolbar";

const localizer = momentLocalizer(moment);



const MyCalendar = () => {
    const [events, setEvents] = useState([
        // {
        //     title: 'Sample Event',
        //     start: new Date(),
        //     end: new Date(),
        // },
    ]);

    return (
        <div className="calendar-page">
            <h2> 's Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                components={{
                    event: MyEventComponent, toolbar: MyToolbar,
                }}
            />
        </div>
    );
};

export default (MyCalendar);

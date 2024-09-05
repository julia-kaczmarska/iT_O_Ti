import React from 'react';

const MyEventComponent = ({ event }) => {
    return (
        <div>
            <strong>{event.title}</strong>
            {event.desc && <div style={{ fontSize: 'smaller' }}>{event.desc}</div>}
        </div>
    );
};

export default MyEventComponent;

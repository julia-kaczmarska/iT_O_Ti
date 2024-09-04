import React from 'react';

const MyEventComponent = ({ event }) => {
    return (
        <div style={{ padding: '5px', borderRadius: '4px', backgroundColor: '#3174ad', color: 'white' }}>
            <strong>{event.title}</strong>
            {event.desc && <div style={{ fontSize: 'smaller' }}>{event.desc}</div>}
        </div>
    );
};

export default MyEventComponent;

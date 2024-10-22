import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";

const MyEventComponent = ({ event }) => {

    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');

                if (!jwtToken) {
                    throw new Error('No jwtToken found');
                }

                const userId = jwtDecode(jwtToken).sub;

                const response = await fetch(`http://localhost:8080/user/${userId}/records`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`, // Dodanie nagłówka autoryzacyjnego
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error(`HTTP error: ${response.status}`);
                    throw new Error('Failed to fetch records');
                }

                const data = await response.json();
                setRecords(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <strong>{event.title}</strong>
            {event.desc && <div style={{ fontSize: 'smaller' }}>{event.desc}</div>}
        </div>
    );
};

export default MyEventComponent;

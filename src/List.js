import React from 'react';
import './components/Calendar/Calendar.css';
import {Link} from "react-router-dom";

function List() {
    return (
        <div className="list-container">
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/regidter">Register</Link></p>
            <p><Link to="/dashboard">Dashboard</Link></p>
        </div>
    );
}

export default List;

import React from 'react';
import './Button.css';

const Button = ({ onClick, children, variant = 'primary' }) => {
    return (
        <button className={`custom-button ${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

import React from 'react';
import Form from './Form';

const LoginForm = () => {
    const fields = [
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email', required: true },
        { label: 'Password', type: 'password', name: 'password', placeholder: 'Enter your password', required: true },
    ];

    const handleLogin = (data) => {
        // Obsługa logowania
        console.log('Logging in:', data);
    };

    return (
        <div>
            <p></p>
        <Form fields={fields} onSubmit={handleLogin} buttonText="Log In" />
        </div>
    );
};

export default LoginForm;

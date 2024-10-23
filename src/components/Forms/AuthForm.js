import React, {useState} from 'react';
import Form from './Form';
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Poprawny import

const AuthForm = ({ context }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const fields = [
        {
            label: 'Name',
            type: 'name',
            name: 'name',
            placeholder: 'Your name',
            required: true,
            onChange: (e) => setName(e.target.value), // Zaktualizuj stan przy każdej zmianie
        },
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email',
            required: true,
            onChange: (e) => setEmail(e.target.value), // Zaktualizuj stan przy każdej zmianie
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
            required: true,
            onChange: (e) => setPassword(e.target.value), // Zaktualizuj stan przy każdej zmianie

        }
    ];


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = context==="signIn" ? {email,password} : {name,email,password};

        const url = context==="signIn" ? 'http://localhost:8080/auth/login' : 'http://localhost:8080/auth/register';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;
                localStorage.setItem('jwtToken', token);

                const decodedToken = jwtDecode(token);
                localStorage.setItem('name', decodedToken.name);
                const userId = decodedToken.sub;
                localStorage.setItem('userId', userId);


                console.log('User ID from token:', userId);

                navigate(`/user/${userId}`);
                console.log('Logged in', decodedToken);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const link = context === "signIn" ? (
        <Link to="/auth/register">Create an account</Link>
    ) : (
        <Link to="/auth/login">I have an account</Link>
    );

    return (
        <Form
            fields={context === "signIn" ? fields.slice(1, 3) : fields.slice(0, 3)}
            onSubmit={handleSubmit}
            buttonText = {context==="signIn" ? "Sign In" : "Sign Up"}
            link = {link}
        />
    );
};

export default AuthForm;

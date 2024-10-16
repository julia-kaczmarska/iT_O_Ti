import React, {useState} from 'react';
import Form from './Form';
import {VStack} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthForm = ({ context }) => {

    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const logFields = [
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
            required: true ,
            onChange: (e) => setPassword(e.target.value), // Zaktualizuj stan przy każdej zmianie
        },
    ];

    const regFields = [
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

    const formData = context==="signIn" ? {email,password} : {name,email,password};

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = context==="signIn" ? 'http://localhost:8080/auth/login' : 'http://localhost:8080/auth/registration';

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
                const userId = decodedToken.sub;

                console.log('User ID from token:', userId);

                navigate(`/user/${userId}`);
                console.log('Logged in', decodedToken);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <Form
            fields= {context==="signIn" ? logFields : regFields}
            onSubmit={handleSubmit}
            buttonText = {context==="signIn" ? "Sign In" : "Sign Up"} />
    );
};

export default AuthForm;

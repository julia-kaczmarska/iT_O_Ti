import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Dashboard from "./components/Dashboard/Dashboard";
import LoginForm from "./components/Forms/LoginForm";
import {ChakraProvider, extendBaseTheme} from '@chakra-ui/react'


const theme = extendBaseTheme();

function App() {
    return (

        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    {/*<Route path="/register" element={<RegisterForm />} />*/}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;

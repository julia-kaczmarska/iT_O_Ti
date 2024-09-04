import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Login from './Login';
import Register from './Register';
import List from "./List";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Template/Header";
import Footer from "./components/Template/Footer";
import Nav from "./components/Template/Nav";

function App() {
    return (
        <Router>
            <div id="wrapper">

                <Header />

                <Nav />


                <div id="main">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                </div>
                <Footer />

            </div>
            <script src="assets/js/jquery.min.js"></script>
            <script src="assets/js/jquery.scrollex.min.js"></script>
            <script src="assets/js/jquery.scrolly.min.js"></script>
            <script src="assets/js/browser.min.js"></script>
            <script src="assets/js/breakpoints.min.js"></script>
            <script src="assets/js/util.js"></script>
            <script src="assets/js/main.js"></script>
        </Router>
    );
}

export default App;

import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Layout from "./components/Layout";
import {ThemeProvider, useThemeContext} from "./themes/ThemeContext";

function App() {

    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu

    function useAuth() {
        const isAuthenticated = Boolean(localStorage.getItem("jwtToken"));
        return isAuthenticated;
    }

    function PrivateRoute({ children }) {
        const isAuthenticated = useAuth();
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" replace />;
        }
        return children;
    }


    return (
        <ChakraProvider theme={activeColorTheme}>
            <Layout>
                <Router>
                    <Routes>
                        <Route path="/auth/login" element={<UnauthorizedPage />} />
                        <Route path="/auth/register" element={<UnauthorizedPage />} />
                        <Route path="/user/:userId" element={<Dashboard />} />
                        {/*<Route path="/" element={<PrivateRoute> <Dashboard /></PrivateRoute>}*/}
                        />
                    </Routes>
                </Router>
            </Layout>
        </ChakraProvider>
    );
}

export default function RootApp() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
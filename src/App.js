import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import UnauthorizedPage from "./components/pages/UnauthorizedPage";
import Layout from "./components/pages/Layout";
import {ThemeProvider} from "./themes/ThemeContext";
import {CategoriesProvider} from "./contexts/CategoriesContext";
import AppThemeProvider from "./themes/AppThemeProvider";
import {jwtDecode} from "jwt-decode";
import MyOwnCal from "./components/Calendar/MyOwnCal/MyOwnCal";

function App() {

    function useAuth() {
        const isAuthenticated = Boolean(localStorage.getItem("jwtToken"));
        return isAuthenticated;
    }

    function checkIfExpired() {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            return true;
        }
        try {
            const { exp } = jwtDecode(token);
            if (Date.now() < exp * 1000) {
                return false; // Token jest ważny
            } else {
                return true;
            }
        } catch (error) {
            return true;
        }
    }

    function handleLogout() {
        localStorage.removeItem('jwtToken');
        window.location.href = '/auth/login';
    };

    function PrivateRoute({ children }) {
        const isAuthenticated = useAuth();
        const isExpired = checkIfExpired();
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" replace />;
        }
        return children;
    }

    return (
        <ChakraProvider>
            <AppThemeProvider>
                <CategoriesProvider>
                    <Layout>
                        <Router>
                            <Routes>
                                <Route path="/auth/login" element={<UnauthorizedPage />} />
                                <Route path="/auth/register" element={<UnauthorizedPage />} />
                                <Route path="/user/:userId" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
                                <Route path="/" element={<MyOwnCal />} />
                            </Routes>
                        </Router>
                    </Layout>
                </CategoriesProvider>
            </AppThemeProvider>
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
import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import UnauthorizedPage from "./components/pages/UnauthorizedPage";
import Layout from "./components/pages/Layout";
import {ThemeProvider, useThemeContext} from "./themes/ThemeContext";
import Categories from "./components/Categories/Categories";
import CategorySettings from "./components/Categories/CategorySettings";

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
                        <Route path="/user/:userId" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
                        <Route path="/" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
                        <Route path="/user/:userId/categories" element={<PrivateRoute> <CategorySettings context = "categories" /></PrivateRoute>} />
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
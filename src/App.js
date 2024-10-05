import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import UnauthorizedPage from "./unauthorized/UnauthorizedPage";
import { ChakraProvider } from "@chakra-ui/react";
import Themes from "./themes/Themes";


function App() {
    const [activeColorTheme, setActiveColorTheme] = useState(Themes.defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && savedTheme !== activeColorTheme.id) {
            const foundTheme = Themes[savedTheme];  // Poprawne użycie Themes jako obiektu
            if (foundTheme) setActiveColorTheme(foundTheme);
        }
    }, [activeColorTheme]);  // Dodaj activeColorTheme jako zależność


    const handleThemeChange = (theme) => {
        setActiveColorTheme(theme);
        localStorage.setItem("theme", theme.id);
    };

    function useAuth() {
        const isAuthenticated = Boolean(localStorage.getItem("token"));
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
            <Router>
                <Routes>
                    <Route path="/auth/login" element={<UnauthorizedPage />} />
                    <Route path="/auth/registration" element={<UnauthorizedPage />} />
                    <Route
                        path="/dashboard"
                        element={<Dashboard onThemeChange={handleThemeChange} />}  // Przekazujemy funkcję zmiany motywu
                    />
                    <Route
                        path="/"
                        element={<PrivateRoute><Dashboard onThemeChange={handleThemeChange} /></PrivateRoute>}
                    />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;

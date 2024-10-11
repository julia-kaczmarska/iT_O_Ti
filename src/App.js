import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Themes from "./themes/Themes";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Layout from "./components/Layout";

function App() {
    const [activeColorTheme, setActiveColorTheme] = useState(Themes.defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && savedTheme !== activeColorTheme.id) {
            const foundTheme = Themes[savedTheme];
            if (foundTheme) setActiveColorTheme(foundTheme);
        }
    }, [activeColorTheme]);

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
            <Layout>
                <Router>
                    <Routes>
                        <Route path="/auth/login" element={<UnauthorizedPage />} />
                        <Route path="/auth/registration" element={<UnauthorizedPage />} />
                        <Route path="/user/:userId" element={<Dashboard onThemeChange={handleThemeChange} />} />
                        {/*<Route*/}
                        {/*    path="/"*/}
                        {/*    element={*/}
                        {/*        <PrivateRoute>*/}
                        {/*            <Dashboard onThemeChange={handleThemeChange} />*/}
                        {/*        </PrivateRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                    </Routes>
                </Router>
            </Layout>
        </ChakraProvider>
    );
}

export default App;
import React, { createContext, useContext, useState, useEffect } from 'react';
import Themes from '../themes/Themes'; // Importuj swoje motywy

const ThemeContext = createContext(); // Tworzenie kontekstu

export const ThemeProvider = ({ children }) => {
    const [activeColorTheme, setActiveColorTheme] = useState(Themes.defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && Themes[savedTheme]) {
            setActiveColorTheme(Themes[savedTheme]);
        }
    }, []);

    const switchTheme = (themeId) => {
        if (Themes[themeId]) {
            setActiveColorTheme(Themes[themeId]);
            localStorage.setItem('theme', themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ activeColorTheme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);

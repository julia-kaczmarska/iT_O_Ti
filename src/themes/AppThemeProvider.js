import { extendTheme } from '@chakra-ui/react';
import { useMemo } from 'react';
import { ThemeProvider as ChakraProvider } from '@chakra-ui/react';
import { useThemeContext } from './ThemeContext';

const AppThemeProvider = ({ children }) => {
    const { activeColorTheme } = useThemeContext();

    const dynamicTheme = useMemo(() => {
        return extendTheme({
            colors: {
                black: activeColorTheme.colors[5], // Dynamiczny kolor zamiast czarnego
                white: activeColorTheme.colors[1], // Dynamiczny kolor zamiast białego
            },
        });
    }, [activeColorTheme]);

    return <ChakraProvider theme={dynamicTheme}>{children}</ChakraProvider>;
};

export default AppThemeProvider;

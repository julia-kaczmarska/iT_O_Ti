import React, {useEffect, useState} from "react";
import {baseTheme, Box, Button, extendTheme, Heading, Image, SimpleGrid, VStack} from "@chakra-ui/react";
import cinnamonRoll from "../themes/CinnamonRoll";
import Themes from "../themes/Themes";
import frostelle from "../themes/Frostelle";
import matchaLatte from "../themes/MatchaLatte";
import strawberryMilkshake from "../themes/StrawberryMilkshake";

const Layout = ({ children }) => {
    const [activeColorTheme, setActiveColorTheme] = useState(cinnamonRoll);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Nowy stan dla uwierzytelnienia


    // const mergedTheme = extendTheme(baseTheme, { colors: activeColorTheme.colors });

    useEffect(() => {
        // Sprawdzenie, czy jest token w localStorage
        const savedTheme = localStorage.getItem("theme");
        const token = localStorage.getItem('token');

        if (savedTheme) {
            const foundTheme = Themes[savedTheme];
            if (foundTheme && foundTheme.id !== activeColorTheme.id) {
                setActiveColorTheme(foundTheme);
            }
        }

        // Ustawienie stanu zalogowania na podstawie obecności tokenu
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);  // Usuwamy activeColorTheme z zależności, aby uniknąć nieskończonej pętli

    const handleThemeChange = (theme) => {
        if (theme.id !== activeColorTheme.id) {
            setActiveColorTheme(theme);
            localStorage.setItem('theme', theme.id);
        }
    };

    const switchToFrostelle = () => {
        handleThemeChange(frostelle);
    };

    const switchToCinnamonRoll = () => {
        handleThemeChange(cinnamonRoll);
    };

    const switchToMatchaLatte = () => {
        handleThemeChange(matchaLatte);
    };

    const switchToStrawberryMilkshake = () => {
        handleThemeChange(strawberryMilkshake);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    };

    return(
        <Box
            bgGradient={`radial(${activeColorTheme.colors[6]}, ${activeColorTheme.colors[1]}, ${activeColorTheme.colors[5]}, ${activeColorTheme.colors[3]})`}
            minH="100vh"
            padding="4"
        >
            <VStack spacing={8} >
                <Box justifyContent="space-between" w={"80%"}>

                    <Heading textAlign="center" as="h1" fontSize="4xl" color="white" m={5}>
                        Mocha Money
                    </Heading>

                    {/* Warunkowe renderowanie obrazów, jeśli użytkownik jest zalogowany */}
                    {/*{isAuthenticated && (*/}
                        <>
                            <Image
                                src="/gear.svg"
                                alt="Gear"
                                boxSize="50px"
                                position="absolute"
                                top="5"
                                right="100"
                            />
                            <Image
                                color={'red'}
                                onClick={handleLogout}
                                src="/door.svg"
                                alt="Log out"
                                boxSize="50px"
                                position="absolute"
                                top="5"
                                right="10"
                            />
                        </>
                    {/*)}*/}

                    {children}
                </Box>
            </VStack>

            <SimpleGrid columns={2} spacing={10}>
                <Button onClick={switchToCinnamonRoll} colorScheme="brown">Cinnamon Roll</Button>
                <Button onClick={switchToFrostelle} colorScheme="blue">Frostelle</Button>
                <Button onClick={switchToMatchaLatte} colorScheme="green">Matcha</Button>
                {/*<Button onClick={switchToStrawberryMilkshake} colorScheme="pink">Strawberry Milkshake</Button>*/}

            </SimpleGrid>
        </Box>
    );
}

export default Layout;

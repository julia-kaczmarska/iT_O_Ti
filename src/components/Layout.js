import React, {useEffect, useState} from "react";
import { Box, Heading, Image, useDisclosure, VStack} from "@chakra-ui/react";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import DrawerNavigation from "./DrawerNavigation";
import {useThemeContext} from "../themes/ThemeContext";

const Layout = ({ children }) => {
    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Nowy stan dla uwierzytelnienia


    // const mergedTheme = extendTheme(baseTheme, { colors: activeColorTheme.colors });

    useEffect(() => {
        // Sprawdzenie, czy jest token w localStorage
        const token = localStorage.getItem('token');

        // Ustawienie stanu zalogowania na podstawie obecności tokenu
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);  // Usuwamy activeColorTheme z zależności, aby uniknąć nieskończonej pętli



    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef()


    return(
        <Box
            bgGradient={`radial(${activeColorTheme.colors[6]}, ${activeColorTheme.colors[1]}, ${activeColorTheme.colors[5]}, ${activeColorTheme.colors[4]})`}
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
                                ref={btnRef}
                                onClick={onOpen}
                                cursor={"pointer"}
                                _hover={{
                                    opacity: "50%",
                                }}
                                color={"white"}
                                opacity={"10%"}
                                src="/arrow-down.svg"
                                alt="Settings"
                                boxSize="50px"
                                position="absolute"
                                top="5"
                                right="5"
                            />
                            <Drawer
                                isOpen={isOpen}
                                placement='right'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader>Settings</DrawerHeader>
                                    <DrawerNavigation />
                                </DrawerContent>
                            </Drawer>
                        </>
                    {/*)}*/}

                    {children}
                </Box>
            </VStack>
        </Box>
    );
}

export default Layout;

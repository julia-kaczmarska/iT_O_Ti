import React, {useEffect, useState} from 'react';
import Modal from '../Modal/Modal';
import Budget from "../Budget/Budget";
import MyCalendar from "../Calendar/MyCalendar";
import {
    Box,
    Button,
    SimpleGrid,
    Heading,
    Text,
    VStack,
    Image,
    baseTheme,
    PopoverBody, PopoverArrow, PopoverContent, PopoverTrigger, Popover, GridItem, HStack
} from "@chakra-ui/react";
import {addMonths, format} from "date-fns";
import Footer from "../Footer";
import {useNavigate} from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import cinnamonRoll from "../../themes/CinnamonRoll";
import frostelle from "../../themes/Frostelle";
import matchaLatte from "../../themes/MatchaLatte";
import Themes from "../../themes/Themes";


const Dashboard = () => {
    const colorThemes = [cinnamonRoll, ];
    const [activeColorTheme, setActiveColorTheme] = useState(cinnamonRoll);
    const mergedTheme = extendTheme(baseTheme, { colors: activeColorTheme.colors });
    const handleThemeChange = (theme) => {
        if (theme.id !== activeColorTheme.id) {
            setActiveColorTheme(theme);
            localStorage.setItem('theme', theme.id);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            const foundTheme = Themes[savedTheme];
            if (foundTheme && foundTheme.id !== activeColorTheme.id) {
                setActiveColorTheme(foundTheme);
            }
        }
    }, []);  // Usuń `activeColorTheme` z zależności

    const switchToFrostelle = () => {
        handleThemeChange(frostelle);
    };
    const switchToCinnamonRoll = () => {
        handleThemeChange(cinnamonRoll);
    };
    const switchToMatchaLatte = () => {
        handleThemeChange(matchaLatte);
    };




    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Aktualny miesiąc


    const openModal = (content) => {
        setModalContent(content);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();  // Odświeżenie strony po wylogowaniu
    };

    const formattedMonth = format(currentMonth, 'MMMM yyyy');


    return (
        <Box
            bgGradient={`radial(${activeColorTheme.colors[6]}, ${activeColorTheme.colors[1]}, ${activeColorTheme.colors[2]}, ${activeColorTheme.colors[3]})`}
            minH="100vh"
            padding="4"
        >
                <VStack spacing={8}>
                    <Box display="flex" justifyContent="space-between">

                    <Heading textAlign="center" as="h1" fontSize="4xl" color="white" mt={5}>
                        Mocha Money
                    </Heading>
                        <Image
                            src="/gearIcon.png"
                            alt="Gear"
                            boxSize="50px"
                            borderRadius="full" // Jeśli chcesz zaokrąglone rogi
                            position="absolute"
                            right="100"
                        />
                        <Image
                            onClick={handleLogout}
                            src="/gearIcon.png"
                            alt="Log out"
                            boxSize="50px"
                            borderRadius="full" // Jeśli chcesz zaokrąglone rogi
                            position="absolute"
                            right="4"
                        />

                    </Box>

                    {/* Sekcja nawigacji po miesiącach */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" w="80%" bg="gray.100" p={4} borderRadius="md" boxShadow="md">
                        <Button onClick={handlePrevMonth}>&lt;</Button>
                        <Heading as="h2" size="lg" color="gray.600">{formattedMonth}</Heading>
                        <Button onClick={handleNextMonth}>&gt;</Button>
                    </Box>

                    <SimpleGrid bg="white" borderRadius="md" boxShadow="md" columns={{ sm: 1, md: 2 }} w="80%">
                        <Box m={3}>
                            <Text fontSize="2xl" fontWeight="bold" mb={4}>Someone's budget</Text> {/* Placeholder, na razie */}
                            <MyCalendar currentMonth={currentMonth} />
                        </Box>
                        <Box m={3}>
                            <Text fontSize="2xl" fontWeight="bold" mb={4}>This month budget</Text>
                            <Budget userId={1} />
                        </Box>
                    </SimpleGrid>

                    <Button colorScheme="teal" onClick={() => openModal('Add category')}>
                        Add Category
                    </Button>
                    <Modal content={modalContent} open={open} handleClose={closeModal} />
                </VStack>
                <Footer />


                <Box minH="100vh" padding="4">
                    <VStack spacing={8}>
                        <Heading>Dashboard</Heading>
                        <SimpleGrid columns={2} spacing={10}>
                            <Button onClick={switchToCinnamonRoll} colorScheme="purple">Cinnamon Roll</Button>
                            <Button onClick={switchToFrostelle} colorScheme="orange">Frostelle</Button>
                            <Button onClick={switchToMatchaLatte} colorScheme="orange">Matcha</Button>
                        </SimpleGrid>
                    </VStack>
                </Box>


            </Box>
    );
};



export default Dashboard;

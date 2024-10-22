import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import MyCalendar from "./Calendar/MyCalendar";
import { Box, Button, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";
import { addMonths, format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import Categories from "./Categories";
import {useThemeContext} from "../themes/ThemeContext";
import PlusButton from "./Calendar/Records/PlusButton";
import Budget from "./Budget/Budget";


const Dashboard = () => {
    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu

    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const formattedMonth = format(currentMonth, 'MMMM yyyy');

    // useEffect(() => {
    //     fetchCategories(); // Pobierz kategorie przy ładowaniu komponentu
    // }, []);

    const fetchCategories = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return;

        const userId = jwtDecode(token).sub;

        fetch(`http://localhost:8080/user/${userId}/cats`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    };

    const userName = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found');
            window.location.href = '/auth/login';
        }

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.name;
        } catch (error) {
            console.error('Error decoding token:', error);
            window.location.href = '/auth/login';
            ;
        }
    };

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

    return (
        <VStack>
            <Box display="flex" justifyContent="space-between" alignItems="center" w="80%" bg={activeColorTheme.colors[3]}
                 p={4} borderRadius="md" boxShadow="md">
                <Button onClick={handlePrevMonth} bg={activeColorTheme.colors[1]}>&lt;</Button>
                <Heading as="h2" size="lg" color={activeColorTheme.colors[6]}>{formattedMonth}</Heading>
                <Button onClick={handleNextMonth} bg={activeColorTheme.colors[1]}>&gt;</Button>
            </Box>

            <SimpleGrid bg="white" borderRadius="md" boxShadow="md" columns={{ sm: 1, md: 2 }} w="80%">
                <Box m={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>{userName()}'s budget</Text>
                    <MyCalendar currentMonth={currentMonth} />
                </Box>
                <Box m={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>This month budget</Text>
                    <Budget  />
                </Box>
            </SimpleGrid>


            <SimpleGrid columns={{ sm: 1, md: 2 }} w="80%">
                <Button m='3' bg={activeColorTheme.colors[1]} onClick={() => openModal('Add category')} _hover={{ bg: activeColorTheme.colors[4] }}>
                    Add Category
                </Button>
                <PlusButton onClick={() => openModal('Add record')}/>

            </SimpleGrid>

            <Modal
                content={modalContent}
                open={open}
                handleClose={closeModal}
                // onCategoryAdded={fetchCategories}  // Przekazanie funkcji aktualizacji kategorii
            />

        </VStack>
    );
};

export default Dashboard;

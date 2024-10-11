import React, {useEffect, useState} from 'react';
import Modal from './Modal';
import Budget from "./Budget/Budget";
import MyCalendar from "./Calendar/MyCalendar";

import {
    Box,
    Button,
    SimpleGrid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import {addMonths, format} from "date-fns";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Aktualny miesiąc
    const formattedMonth = format(currentMonth, 'MMMM yyyy');

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
    );
};

export default Dashboard;

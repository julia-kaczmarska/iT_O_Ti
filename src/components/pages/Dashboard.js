import React, { useState } from 'react';
import MyCalendar from "../Calendar/MyCalendar";
import { Box, Button, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";
import { addMonths, format } from "date-fns";
import {useThemeContext} from "../../themes/ThemeContext";
import Budget from "../Budget/Budget";
import OpenModalButton from "../MyButtons/OpenModalButton";

const Dashboard = ( { }) => {
    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const formattedMonth = format(currentMonth, 'MMMM yyyy');

    const userName = localStorage.getItem('name');

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
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>{userName}'s budget</Text>
                    <MyCalendar currentMonth={currentMonth} />
                </Box>
                <Box m={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>This month budget</Text>
                    <Budget  />
                </Box>
            </SimpleGrid>


            {/*<SimpleGrid columns={{ sm: 1, md: 2 }} w="80%">*/}
            {/*    <Button m='3' bg={activeColorTheme.colors[1]} onClick={() => openModal('Add category')} _hover={{ bg: activeColorTheme.colors[4] }}>*/}
            {/*        Add Category*/}
            {/*    </Button>*/}
            {/*    <PlusButton onClick={() => openModal('Add record')}/>*/}

            {/*</SimpleGrid>*/}


            <OpenModalButton label = "Add category"/>
            <OpenModalButton label = "Edit category"/>
            <OpenModalButton label = "Category settings"/>
            <OpenModalButton label = "Add record"/>




        </VStack>
    );
};

export default Dashboard;

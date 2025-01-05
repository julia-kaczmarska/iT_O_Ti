import React, { useState } from 'react';
import { Box, SimpleGrid, Heading, Text, VStack } from "@chakra-ui/react";
import {useThemeContext} from "../../themes/ThemeContext";
import BudgetLayout from "../Budget/BudgetLayout";
import MyOwnCal from "../Calendar/MyOwnCal";
import CalendarNavigation from "../Calendar/CalendarNavigation";

const Dashboard = ( { }) => {
    const { activeColorTheme } = useThemeContext(); // Pobierz aktywny motyw z kontekstu
    const userName = localStorage.getItem('name');

    const yearMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };

    return (
        <VStack>
            <CalendarNavigation
                currentMonth={currentMonth}
                currentYear={currentYear}
                formattedMonth={`${yearMonths[currentMonth]} ${currentYear}`}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                activeColorTheme={activeColorTheme}
            />
            <SimpleGrid bg="white" borderRadius="md" boxShadow="md" columns={{ sm: 1, md: 2 }} w="100%" sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
                <Box m={3} sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>{userName}'s budget</Text>
                    <MyOwnCal
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                    />
                </Box>
                <Box m={3}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>This month budget</Text>
                    <BudgetLayout  />
                </Box>
            </SimpleGrid>
        </VStack>
    );
};

export default Dashboard;

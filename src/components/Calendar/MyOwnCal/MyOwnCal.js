import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import MyEventComponent from "./MyEventComponent";
import { useThemeContext } from "../../../themes/ThemeContext";
import OpenModalButton from "../../MyButtons/OpenModalButton";
import CalendarGrid from "./CalendarGrid";

const MyOwnCal = ({ currentMonth, currentYear }) => {
    const { activeColorTheme } = useThemeContext();
    const weekDaysDefault = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [isMondayFirst, setIsMondayFirst] = useState(false);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weekDays = isMondayFirst
        ? [...weekDaysDefault.slice(1), weekDaysDefault[0]]
        : weekDaysDefault;

    const toggleWeekStart = () => {
        setIsMondayFirst((prev) => !prev);
    };

    const getPlaceholderDate = (day) => {
        return new Date(currentYear, currentMonth, day+2).toISOString().split('T')[0]; // format YYYY-MM-DD
    };

    return (
        <Box w="100%" maxW="800px" mx="auto" p={4} bg="gray.50" borderRadius="lg">
            <Button
                onClick={toggleWeekStart}
                bg={activeColorTheme.colors[4]}
                mb={4}
                size="sm"
            >
                {isMondayFirst ? "Start Week on Sunday" : "Start Week on Monday"}
            </Button>

            <Grid templateColumns="repeat(7, 1fr)" gap={2} textAlign="center" mb={4} className='week-days'>
                {weekDays.map((day) => (
                    <Text key={day} fontSize="md" fontWeight="bold" className='week-day-name'>
                        {day}
                    </Text>
                ))}
            </Grid>
            <CalendarGrid currentMonth={currentMonth} currentYear={currentYear} isMondayFirst={isMondayFirst} daysInMonth={daysInMonth}/>

        </Box>
    );
};

export default MyOwnCal;

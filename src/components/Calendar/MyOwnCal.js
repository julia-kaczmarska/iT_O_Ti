import { Box, Text, Grid, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useThemeContext } from "../../themes/ThemeContext";
import CalendarGrid from "./CalendarGrid";

const MyOwnCal = ({ currentMonth, currentYear, fetchBudgetData }) => {
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

    return (
        <Box w="100%" maxW="800px" mx="auto" p={4} borderRadius="lg">
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
            <CalendarGrid currentMonth={currentMonth} currentYear={currentYear} isMondayFirst={isMondayFirst} daysInMonth={daysInMonth} fetchBudgetData={fetchBudgetData}/>

        </Box>
    );
};

export default MyOwnCal;

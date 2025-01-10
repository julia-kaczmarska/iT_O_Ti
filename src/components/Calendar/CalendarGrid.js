import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import EventsManager from "./Events/EventsManager";
import { useThemeContext } from "../../themes/ThemeContext";
import OpenModalButton from "../MyButtons/OpenModalButton";

const CalendarGrid = ({ currentMonth, currentYear, isMondayFirst, daysInMonth }) => {
    const { activeColorTheme } = useThemeContext();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const currentDate = new Date();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = isMondayFirst ? (firstDayOfMonth + 6) % 7 : firstDayOfMonth;

    const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const daysFromPrevMonth = Array.from(
        { length: adjustedFirstDay },
        (_, i) => previousMonthDays - adjustedFirstDay + i + 1
    );

    const daysFromNextMonth = Array.from(
        { length: 35 - (daysFromPrevMonth.length + daysInMonth) },
        (_, i) => i + 1
    );

    const daysGrid = [
        ...daysFromPrevMonth.map((day) => ({ day, type: "prev" })),
        ...Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, type: "current" })),
        ...daysFromNextMonth.map((day) => ({ day, type: "next" })),
    ].slice(0, 35); // Zapewniamy maksymalnie 35 dni

    const getDateFromCal = (day, type) => {
        if (type === "prev") {
            return new Date(currentYear, currentMonth - 1, day+1).toISOString().split("T")[0];
        } else if (type === "next") {
            return new Date(currentYear, currentMonth + 1, day+1).toISOString().split("T")[0];
        }
        return new Date(currentYear, currentMonth, day+1).toISOString().split("T")[0];
    };

    return (
        <Grid templateColumns="repeat(7, 1fr)" gap={2} className="month-days">
            {daysGrid.map(({ day, type }, index) => (
                <GridItem
                    key={index}
                    h="115px"
                    borderRadius="md"
                    textAlign="center"
                    boxShadow="sm"
                    bg={
                        type === "current" &&
                        day === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? activeColorTheme.colors[4]
                            : type === "current"
                                ? "white"
                                : "rgba(0, 0, 0, 0.1)"
                    }
                    color={
                        type === "current" &&
                        day === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? "white"
                            : type === "current"
                                ? "black"
                                : "rgba(0, 0, 0, 0.5)"
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <Box
                        className="month-day-header"
                        key={index}
                        h="20px"
                        mb={1}
                        position="relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {hoveredIndex === index ? (
                            <OpenModalButton
                                label="+"
                                modalType="AddRecord"
                                modalProps={{ dateFromCal: getDateFromCal(day, type) }}
                                fitToParent={true}
                            />
                        ) : (
                            <Text textAlign="center">{day}</Text>
                        )}
                    </Box>
                    <Box className="month-day-content">
                        {type === "current" && (
                            <EventsManager
                                currentDay={day}
                                currentMonth={currentMonth}
                                currentYear={currentYear}
                            />
                        )}
                    </Box>
                </GridItem>
            ))}
        </Grid>
    );
};

export default CalendarGrid;


import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import MyEventComponent from "./MyEventComponent";
import { useThemeContext } from "../../themes/ThemeContext";
import OpenModalButton from "../MyButtons/OpenModalButton";

const MyOwnCal = ({ currentMonth, currentYear, isMondayFirst, daysInMonth }) => {
    const { activeColorTheme } = useThemeContext();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const currentDate = new Date();


    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const adjustedFirstDay = isMondayFirst ? (firstDayOfMonth + 6) % 7 : firstDayOfMonth;

    const daysGrid = [...Array(adjustedFirstDay).fill(null), ...Array(daysInMonth).keys()];

    const getPlaceholderDate = (day) => {
        return new Date(currentYear, currentMonth, day+2).toISOString().split('T')[0]; // format YYYY-MM-DD
    };

    return (

            <Grid templateColumns="repeat(7, 1fr)" gap={2} className='month-days'>
                {daysGrid.map((day, index) => (
                    <GridItem
                        key={index}
                        h='115px'
                        borderRadius="md"
                        textAlign="center"
                        boxShadow="sm"
                        bg={day + 1 === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? activeColorTheme.colors[4]
                            : "white"
                        }
                        color={day + 1 === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? "white"
                            : "black"
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
                                    modalProps={{ placeholderDate: getPlaceholderDate(day) }}
                                    fitToParent={true}
                                />
                            ) : (
                                <Text textAlign="center">{day + 1}</Text>
                            )}
                        </Box>
                        <Box className='month-day-content'>
                            {day !== null && (
                                <MyEventComponent
                                    currentDay={day + 1}
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

export default MyOwnCal;

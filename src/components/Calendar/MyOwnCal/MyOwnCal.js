import { Box, Text, Flex, Grid, GridItem, Button } from "@chakra-ui/react";
import { useState } from "react";

const MyOwnCal = ({ currentMonth, currentYear }) => {
    const weekDaysDefault = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const yearMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();

    const [isMondayFirst, setIsMondayFirst] = useState(false);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const weekDays = isMondayFirst
        ? [...weekDaysDefault.slice(1), weekDaysDefault[0]]
        : weekDaysDefault;

    const adjustedFirstDay = isMondayFirst ? (firstDayOfMonth + 6) % 7 : firstDayOfMonth;

    const daysGrid = [...Array(adjustedFirstDay).fill(null), ...Array(daysInMonth).keys()];

    const toggleWeekStart = () => {
        setIsMondayFirst((prev) => !prev);
    };

    return (
        <Box w="100%" maxW="500px" mx="auto" p={4} bg="gray.50" borderRadius="lg" boxShadow="md">
            {/*<Flex justifyContent="space-between" alignItems="center" mb={4}>*/}
            {/*    <Text fontSize="xl" fontWeight="medium">*/}
            {/*        {yearMonths[currentMonth]}*/}
            {/*    </Text>*/}
            {/*    <Text fontSize="xl" fontWeight="medium">*/}
            {/*        {currentYear}*/}
            {/*    </Text>*/}
            {/*</Flex>*/}

            <Button
                onClick={toggleWeekStart}
                colorScheme="blue"
                mb={4}
                size="sm"
            >
                {isMondayFirst ? "Start Week on Sunday" : "Start Week on Monday"}
            </Button>

            {/*week-days*/}
            <Grid templateColumns="repeat(7, 1fr)" gap={2} textAlign="center" mb={4} className='week-days'>
                {weekDays.map((day) => (
                    <Text key={day} fontSize="md" fontWeight="bold" className='week-day-name'>
                        {day}
                    </Text>
                ))}
            </Grid>

            {/*month-days*/}
            <Grid templateColumns="repeat(7, 1fr)" gap={2} className='month-days'>
                {daysGrid.map((day, index) => (
                    <GridItem
                        h='100px'
                        borderRadius="md"
                        textAlign="center"
                        boxShadow="sm"
                        bg={day + 1 === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? "blue.200"
                            : "white"
                        }
                        color={day + 1 === currentDate.getDate() &&
                        currentMonth === currentDate.getMonth() &&
                        currentYear === currentDate.getFullYear()
                            ? "white"
                            : "black"
                        }
                    >
                        <Box
                            className='month-day-header'
                            key={index}
                            h='20px'
                            mb={1}
                        >
                            {day !== null ? day + 1 : ""}
                        </Box>
                        <Box className='month-day-content'>
                            Hello

                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default MyOwnCal;

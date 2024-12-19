import { Box, Heading } from "@chakra-ui/react";
import Buttons from "../../MyButtons/Buttons";

const CalendarNavigation = ({ onPrevMonth, onNextMonth, formattedMonth, activeColorTheme }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%" bg={activeColorTheme.colors[1]} borderRadius="md" boxShadow="md" p={5}>
            <Buttons onClick={onPrevMonth} label="<" />
            <Heading as="h2" size="lg" color={activeColorTheme.colors[6]}>
                {formattedMonth}
            </Heading>
            <Buttons onClick={onNextMonth} label=">" />
        </Box>
    );
};

export default CalendarNavigation;

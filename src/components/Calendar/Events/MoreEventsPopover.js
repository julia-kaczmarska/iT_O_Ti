import { Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import DayEvent from "./DayEvent";

const MoreEventsPopover = ({ events, refreshEvents }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Box style={{
                    backgroundColor: '#ccc',
                    color: '#000',
                    borderRadius: '5px',
                    margin: '2px',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}>
                    <Text fontSize="xs">+{events.length}</Text>
                </Box>
            </PopoverTrigger>
            <PopoverContent border="none">
                <PopoverArrow />
                <PopoverBody>
                    {events.map((event, index) => (
                        <DayEvent key={index} event={event} refreshEvents={refreshEvents}/>
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default MoreEventsPopover;

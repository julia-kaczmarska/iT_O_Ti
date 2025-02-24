import {Box, Popover, PopoverTrigger} from "@chakra-ui/react";

const EventDescTooltip = ({ remainingEvents, openModal, refreshEvents }) => (
    <Popover>
        <PopoverTrigger>
            <Box
                style={{
                    backgroundColor: '#ccc',
                    color: '#000',
                    borderRadius: '5px',
                    margin: '2px',
                    padding: '5px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <Text fontSize="xs">
                    +{remainingEvents.length}
                </Text>
            </Box>
        </PopoverTrigger>
        {/*Szczegóły dla pozostałych zdarzeń*/}
    </Popover>
);

export default EventDescTooltip;


import { Box, Text } from "@chakra-ui/react";
import { useCategories } from "../../../contexts/CategoriesContext";
import {useModal} from "../../../contexts/ModalContext";

const DayEvent = ({ event, refreshEvents, fetchBudgetData }) => {
    const { openModal } = useModal();
    const { categories } = useCategories();
    const matchingCategory = categories.find(cat => cat.categoryId === event.categoryId);
    const eventColor = matchingCategory ? matchingCategory.color : '#ffffff';

    return (
        <Box
            onClick={() => openModal('EditRecord', { existingRecord: event, refreshEvents: refreshEvents, fetchBudgetData: fetchBudgetData })}
            style={{
                cursor: 'pointer',
                backgroundColor: eventColor,
                color: '#fff',
                borderRadius: '5px',
                margin: '2px',
                padding: '5px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text fontSize="xs">-{event.amount.toFixed(2)}</Text>
        </Box>
    );
};

export default DayEvent;

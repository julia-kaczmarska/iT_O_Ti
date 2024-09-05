import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Budget from "../Budget/Budget";
import MyCalendar from "../Calendar/Calendar";
import {Box, Button, SimpleGrid, Heading, Text, VStack, ChakraProvider} from "@chakra-ui/react";
import {CinnamonRoll, MatchaLatte} from "../Themes/CinnamonRoll";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
            <Box bg={CinnamonRoll.kolor1} minH="100vh" padding="4">
                <VStack spacing={8}>
                    <Heading as="h1" fontSize="4xl" color="white" mt={4}>
                        Mocha Money
                    </Heading>
                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} w="80%">
                        <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                            <MyCalendar />
                        </Box>
                        <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                            <Text fontSize="2xl" fontWeight="bold" mb={4}>Budget here</Text>
                            <Budget />
                        </Box>
                    </SimpleGrid>
                    <Button colorScheme="teal" onClick={() => openModal('Add category')}>
                        Add Category
                    </Button>
                    <Modal content={modalContent} open={open} handleClose={closeModal} />
                </VStack>
            </Box>
    );
};

export default Dashboard;

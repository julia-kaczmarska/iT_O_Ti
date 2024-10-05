import React, { useState } from 'react';
import {Box, SimpleGrid, Heading, VStack} from "@chakra-ui/react";
import AuthForm from "../components/Forms/AuthForm";
import {useLocation} from "react-router-dom";

const UnauthorizedPage = () => {

    const context = useLocation().pathname === ('/auth/login'||'/') ? 'signIn' : 'signUp';

    return (
            <Box
                minH="100vh"
                padding="4"
            >
                <VStack spacing={8}>
                    <Heading as="h1" fontSize="4xl" color="white" mt={4}>
                        Mocha Money
                    </Heading>

                    <SimpleGrid bg="white" borderRadius="md" boxShadow="md" columns={{ sm: 1, md: 2 }} w="80%" height={500}>
                        <Box>
                            <AuthForm context={context}/>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Box>
    );
};

export default UnauthorizedPage;

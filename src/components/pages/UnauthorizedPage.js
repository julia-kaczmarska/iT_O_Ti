import React, { useState } from 'react';
import {Box, SimpleGrid, Heading, VStack, Text} from "@chakra-ui/react";
import AuthForm from "../Forms/AuthForm";
import {useLocation} from "react-router-dom";

const UnauthorizedPage = () => {

    const context = useLocation().pathname === ('/auth/login'||'/') ? 'signIn' : 'signUp';

    return (
                    <SimpleGrid bg="white" borderRadius="md" boxShadow="md" columns={{ sm: 1, md: 2 }} w="100%" height={500}  >
                        <Box m={10}>
                            <AuthForm context={context}/>
                        </Box>
                    </SimpleGrid>
    );
};

export default UnauthorizedPage;

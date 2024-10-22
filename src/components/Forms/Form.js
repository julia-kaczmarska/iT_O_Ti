import React from 'react';
import {Button, FormControl, FormLabel, Input, SimpleGrid, VStack} from "@chakra-ui/react";
import {useThemeContext} from "../../themes/ThemeContext";


const Form = ({ fields, onSubmit, buttonText, link }) => {
    const { activeColorTheme } = useThemeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                {fields.map((field, index) => (
                    <FormControl key={index} isRequired={field.required}>
                        <FormLabel>{field.label}</FormLabel>
                        <Input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                        />
                    </FormControl>
                ))}
                <SimpleGrid columns={{ sm: 1, md: 2 }}>
                    <Button type="submit" bg={activeColorTheme.colors[2]} m={5}>
                        {buttonText}
                    </Button>
                    <Button bg={activeColorTheme.colors[4]} m={5}>
                        {link}
                    </Button>
                </SimpleGrid>


            </VStack>
        </form>
    );
};

export default Form;

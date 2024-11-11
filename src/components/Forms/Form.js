import React from 'react';
import { Button, FormControl, FormLabel, Input, Select, Switch, SimpleGrid, VStack } from "@chakra-ui/react";
import { useThemeContext } from "../../themes/ThemeContext";

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
                        {field.type === 'text' && (
                            <Input
                                type="text"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'password' && (
                            <Input
                                type="password"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'number' && (
                            <Input
                                type="number"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'date' && (
                            <Input
                                type="date"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'switch' && (
                            <Switch
                                isChecked={field.value}
                                onChange={field.onChange}
                                id={field.name}
                            >
                                {field.placeholder}
                            </Switch>
                        )}
                        {field.type === 'select' && (
                            <Select
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            >
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </FormControl>
                ))}
                <SimpleGrid columns={{ sm: 1, md: 2 }}>
                    <Button type="submit" bg={activeColorTheme.colors[2]} m={5}>
                        {buttonText}
                    </Button>
                    {link && (
                        <Button bg={activeColorTheme.colors[4]} m={5}>
                            {link}
                        </Button>
                    )}
                </SimpleGrid>
            </VStack>
        </form>
    );
};

export default Form;

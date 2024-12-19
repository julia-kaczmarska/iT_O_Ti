import React, {useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Switch,
    SimpleGrid,
    VStack,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react";
import { useThemeContext } from "../../themes/ThemeContext";
import Buttons from "../MyButtons/Buttons";

const Form = ({ fields, onSubmit, buttonText, link }) => {
    const { activeColorTheme } = useThemeContext();
    const [value, setValue] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
            <VStack spacing={4}>
                {fields.map((field, index) => (
                    <FormControl key={index} isRequired={field.required}>
                        <FormLabel>{field.label}</FormLabel>
                        {field.type === 'text' && (
                            <Input
                                bg='white'
                                type="text"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'password' && (
                            <Input
                                bg='white'
                                type="password"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={field.onChange}
                            />
                        )}
                        {field.type === 'number' && (
                            <NumberInput
                                onChange={(valueString) => setValue(valueString)}
                                value={field.value}
                                max={999999}
                            >
                                <NumberInputField
                                    // type="number"
                                    // name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={field.onChange}
                                />
                            </NumberInput>
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
                    </FormControl>
                ))}
                <SimpleGrid columns={{ sm: 1, md: 2 }} gap={10}>
                    <Buttons label={buttonText} onClick={handleSubmit}/>
                    {link && (
                        <Buttons type='secondary' label={link}/>
                    )}
                </SimpleGrid>
            </VStack>
        </form>
    );
};

export default Form;

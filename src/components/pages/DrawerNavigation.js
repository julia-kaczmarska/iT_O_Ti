import {
    Accordion, AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel,
    Box,
    Button,
    DrawerBody,
    DrawerFooter, Grid,
    Stack,
    Text
} from "@chakra-ui/react";
import {cinnamonRoll, frostelle, matchaLatte, other, strawberryMilkshake} from "../../themes/Themes";
import { useThemeContext } from "../../themes/ThemeContext";
import React, {useEffect} from "react";
import OpenModalButton from "../MyButtons/OpenModalButton";
import CategorySettings from "../Categories/CategorySettings";
import ColorPoints from "../Categories/ColorPoints";
import Buttons from "../MyButtons/Buttons";

const DrawerNavigation = ({  }) => {
    const { activeColorTheme, switchTheme } = useThemeContext();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/auth/login';
    };

    return(
        <Box>
            <DrawerBody >
                <Stack >
                    <Accordion allowMultiple sx={{'--chakra-colors-chakra-border-color': activeColorTheme.colors[2]}}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left'>
                                        Themes
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} textAlign={"center"}>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('cinnamonRoll')} bg={cinnamonRoll.colors[3]} color={cinnamonRoll.colors[1]} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Cinnamon Roll
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('frostelle')} bg={frostelle.colors[2]} color={frostelle.colors[1]} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Frostelle
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('matchaLatte')} bg={matchaLatte.colors[3]} color={matchaLatte.colors[1]} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Matcha Latte
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('strawberryMilkshake')} bg={strawberryMilkshake.colors[3]} color={strawberryMilkshake.colors[1]} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Strawberry Milkshake
                                </Button>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left'>
                                        Your categories
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Grid templateColumns="auto 1fr"
                                      alignItems="center"
                                      gap={4}>
                                    <ColorPoints />
                                    <CategorySettings />
                                </Grid>
                                <OpenModalButton label='Add category' onClose={true}/>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                </Stack>

            </DrawerBody>
            <DrawerFooter>
                <Buttons
                    type='secondary'
                    onClick={handleLogout}
                    label='Log out'
                />
            </DrawerFooter>
        </Box>
    );
}

export default DrawerNavigation;
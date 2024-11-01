import {
    Accordion, AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel,
    Box,
    Button,
    DrawerBody,
    DrawerFooter,
    Stack,
    Text
} from "@chakra-ui/react";
import { other } from "../../themes/Themes";
import { useThemeContext } from "../../themes/ThemeContext";
import Categories from "../Categories/Categories";
import React from "react";
import OpenModalButton from "../MyButtons/OpenModalButton";
import CategorySettings from "../Categories/CategorySettings";

const DrawerNavigation = ({ } ) => {
    const { activeColorTheme, switchTheme } = useThemeContext();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/auth/login';
        console.log("token: " + localStorage.getItem('jwtToken'));
    };

    const openCategorySettings = () => {
        const userId = localStorage.getItem('userId');
        window.location.href = `/user/${userId}/categories`
    }

    return(
        <Box>
            <DrawerBody >
                <Stack >
                    <Accordion allowMultiple>
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
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('cinnamonRoll')} bg={other.colors.brown} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Cinnamon Roll
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('frostelle')} bg={other.colors.blue} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Frostelle
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('matchaLatte')} bg={other.colors.green} opacity={'100%'} _hover={{opacity: '80%'}}>
                                    Matcha Latte
                                </Button>
                                <Button m={1} w = {'100%'} onClick={() => switchTheme('strawberryMilkshake')} bg={other.colors.pink} opacity={'100%'} _hover={{opacity: '80%'}}>
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
                                <CategorySettings />
                                <OpenModalButton label={"Category settings"} onClose={true}/>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                </Stack>

            </DrawerBody>
            <DrawerFooter>
                <Button
                    bg={activeColorTheme.colors[5]}
                    variant="solid"
                    onClick={handleLogout}
                >
                    Log out
                </Button>
            </DrawerFooter>
        </Box>
    );
}

export default DrawerNavigation;
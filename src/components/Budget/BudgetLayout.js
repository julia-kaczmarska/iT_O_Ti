import {
    Text,
    SimpleGrid,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Thead,
    Th,
    GridItem,
    Grid, Box
} from "@chakra-ui/react";
import Budget from "./Budget";


const BudgetLayout = ({}) => {

    return (
        <Grid
            h="300px"
            templateColumns="repeat(3, 1fr)"
            gap={4}
        >
            <GridItem colSpan={2} bg="orange.200">
                <Box>Budget for this month</Box>
            </GridItem>
            <GridItem bg="orange.400">
                <Box>X $</Box>
            </GridItem>
            <GridItem bg="yellow.200">
                <Box>Category</Box>
            </GridItem>
            <GridItem bg="yellow.300">
                <Box>Budgeted</Box>
            </GridItem>
            <GridItem bg="yellow.400">
                <Box>Left</Box>
            </GridItem>

            {/*<Budget/>*/}

            <GridItem colSpan={2} bg="green.200">
                <Box>Unbudgeted</Box>
            </GridItem>
            <GridItem bg="green.400">
                <Box>X $</Box>
            </GridItem>
            <GridItem colSpan={2} bg="blue.200">
                <Box>Total left</Box>
            </GridItem>
            <GridItem bg="blue.400">
                <Box>X $</Box>
            </GridItem>
        </Grid>

    );
}

export default BudgetLayout;

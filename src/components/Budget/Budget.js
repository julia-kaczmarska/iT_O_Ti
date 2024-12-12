import {Box, Grid, GridItem} from "@chakra-ui/react";


const Budget = () => {
    return(
        <Grid colSpan={3}  templateColumns="repeat(3, 1fr)">

            <GridItem bg="yellow.200">
                <Box>Category</Box>
            </GridItem>
            <GridItem bg="yellow.300">
                <Box>Budgeted</Box>
            </GridItem>
            <GridItem bg="yellow.400">
                <Box>Left</Box>
            </GridItem>
        </Grid>
    )
}

export default Budget;
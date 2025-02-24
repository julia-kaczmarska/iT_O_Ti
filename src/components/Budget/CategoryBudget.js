import React from "react";
import { GridItem, Grid, Text } from "@chakra-ui/react";

const CategoryBudget = ({ category, plannedBudget }) => {
    const budgeted = plannedBudget ? plannedBudget.plannedAmount.toFixed(2) : "0.00";
    const left = plannedBudget ? (plannedBudget.plannedAmount - plannedBudget.spentAmount).toFixed(2) : "0.00";

    return (
        <Grid templateColumns="2fr 1fr 1fr" borderBottom="1px solid lightgray" py={2} _hover={{ bg: "gray.50" }}>
            <GridItem>
                <Text>{category.title}</Text>
            </GridItem>
            <GridItem textAlign="right">
                <Text>{budgeted} $</Text>
            </GridItem>
            <GridItem textAlign="right" fontWeight="bold">
                <Text>{left} $</Text>
            </GridItem>
        </Grid>
    );
};

export default CategoryBudget;

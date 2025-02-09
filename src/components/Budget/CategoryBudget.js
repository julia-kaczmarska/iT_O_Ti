import React from "react";
import { GridItem, Text } from "@chakra-ui/react";

const CategoryBudget = ({ category, plannedBudget }) => {
    const budgeted = plannedBudget ? plannedBudget.plannedAmount.toFixed(2) : "0.00";
    const left = plannedBudget ? (plannedBudget.plannedAmount - plannedBudget.spentAmount).toFixed(2) : "0.00";

    return (
        <>
            <GridItem p={2}>
                <Text>{category.title}</Text>
            </GridItem>
            <GridItem p={2}>
                <Text>{budgeted} $</Text>
            </GridItem>
            <GridItem p={2}>
                <Text>{left} $</Text>
            </GridItem>
        </>
    );
};

export default CategoryBudget;

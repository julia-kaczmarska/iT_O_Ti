import React, {useCallback, useEffect, useState} from "react";
import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { useCategories } from "../../contexts/CategoriesContext";
import CategoryBudget from "./CategoryBudget";
import OpenModalButton from "../MyButtons/OpenModalButton";

const BudgetLayout = ({ currentMonth, currentYear, setFetchBudgetData }) => {
    const { categories } = useCategories();
    const [budgetData, setBudgetData] = useState(null);

    const correctedMonth = currentMonth + 1;
    const formattedMonth = correctedMonth.toString().padStart(2, "0");
    const date = `${currentYear}-${formattedMonth}-01`;

    const fetchBudgetData = useCallback(async () => {
        console.log("Fetching data for date:", date);
        try {
            const token = localStorage.getItem("jwtToken");
            const userId = localStorage.getItem("userId");
            const response = await fetch(
                `http://localhost:8080/user/${userId}/getBudget/${date}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setBudgetData(data);
            } else if (response.status === 400) {
                console.log("No budget found for this month, initializing with defaults.");
                setBudgetData({
                    totalIncome: 0,
                    remainingBalance: 0,
                    plannedBudgets: [],
                });
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching budget data:", error);
            setBudgetData({
                totalIncome: 0,
                remainingBalance: 0,
                plannedBudgets: [],
            });
        }
    }, [date]);

    useEffect(() => {
        fetchBudgetData();
    }, [fetchBudgetData]);

    useEffect(() => {
        setFetchBudgetData(() => fetchBudgetData);
    }, [fetchBudgetData]); // Użycie useEffect, aby nie nadpisywać przy każdym renderze

    if (!budgetData) {
        return <Text>Loading...</Text>;
    }

    const unbudgeted =
        budgetData.totalIncome.toFixed(2) -
        budgetData.plannedBudgets.reduce((acc, item) => acc + item.plannedAmount, 0);
    const totalLeft = budgetData.remainingBalance.toFixed(2);

    const hovered = budgetData.totalIncome

    return (
        <Box
            p={6}
            // minW="450px"
            // maxW="500px"
            ml={8}
        >
            <VStack spacing={4} align="stretch">
                {/* Całkowity budżet */}
                <Grid templateColumns="2fr 1fr" gap={4} p={2}
                      //bg
                    borderRadius="8px"
                boxShadow='lg'>
                    <Text fontWeight="bold" fontSize="lg">Sum of your incomes:</Text>
                    <Text fontWeight="bold" fontSize="lg" textAlign="right">
                        {budgetData.totalIncome.toFixed(2)} $
                    </Text>
                </Grid>

                {/* Nagłówki tabeli */}
                <Grid templateColumns="2fr 1fr 1fr" fontWeight="bold" borderBottom="2px solid black" pb={2}>
                    <Text>Category</Text>
                    <Text textAlign="right">Budgeted</Text>
                    <Text textAlign="right">Left</Text>
                </Grid>

                {/* Kategorie */}
                {categories.map((category) => {
                    const plannedBudget = budgetData.plannedBudgets.find(
                        (pb) => pb.categoryId === category.categoryId
                    );

                    return (
                        <CategoryBudget
                            key={category.categoryId}
                            category={category}
                            plannedBudget={plannedBudget}
                        />
                    );
                })}

                {/* Unbudgeted */}
                <Grid templateColumns="2fr 1fr" borderTop="2px solid black" pt={2} >
                    <Text fontWeight="bold">Unbudgeted</Text>
                    <Text fontWeight="bold" textAlign="right">{unbudgeted.toFixed(2)} $</Text>
                </Grid>

                {/* Total left */}
                <Grid templateColumns="2fr 1fr" borderTop="2px solid black" pt={2}>
                    <Text fontWeight="bold">Total left</Text>
                    <Text fontWeight="bold" textAlign="right">{totalLeft} $</Text>
                </Grid>

                <OpenModalButton modalType={"AddBudgetPlan"} modalProps={{
                    date: date,
                    refreshBudgetData: fetchBudgetData
                }} />
            </VStack>
        </Box>
    );
};

export default BudgetLayout;

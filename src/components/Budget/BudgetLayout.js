import React, { useEffect, useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useCategories } from "../../contexts/CategoriesContext";
import CategoryBudget from "./CategoryBudget";
import OpenModalButton from "../MyButtons/OpenModalButton";

const BudgetLayout = ({ currentMonth, currentYear }) => {
    const { categories } = useCategories();
    const [budgetData, setBudgetData] = useState(null);

    const correctedMonth = currentMonth + 1;
    const formattedMonth = correctedMonth.toString().padStart(2, "0");
    const date = `${currentYear}-${formattedMonth}-01`;

    useEffect(() => {
        const fetchBudgetData = async () => {
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
                    const previousMonthData = await fetchPreviousMonthBalance();
                    setBudgetData({
                        totalIncome: 0,
                        remainingBalance: previousMonthData || 0,
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
        };

        const fetchPreviousMonthBalance = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const userId = localStorage.getItem("userId");

                const previousMonth = correctedMonth - 1 || 12;
                const previousYear = correctedMonth === 1 ? currentYear - 1 : currentYear;
                const formattedPreviousMonth = previousMonth.toString().padStart(2, "0");
                const previousDate = `${previousYear}-${formattedPreviousMonth}-01`;

                const response = await fetch(
                    `http://localhost:8080/user/${userId}/getBudget/${previousDate}`,
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
                    return data.remainingBalance.toFixed(2);
                } else {
                    console.log("No budget found for the previous month.");
                    return 0;
                }
            } catch (error) {
                console.error("Error fetching previous month balance:", error);
                return 0;
            }
        };

        fetchBudgetData();
    }, [date, correctedMonth, currentYear]);

    if (!budgetData) {
        return <Text>Loading...</Text>;
    }

    const unbudgeted =
        budgetData.totalIncome.toFixed(2) -
        budgetData.plannedBudgets.reduce((acc, item) => acc + item.plannedAmount, 0);
    const totalLeft = budgetData.remainingBalance.toFixed(2);

    return (
        <Grid h="auto" templateColumns="repeat(3, 1fr)" gap={4} p={4}>
            <GridItem colSpan={2} bg="orange.200" p={4}>
                <Text fontWeight="bold">Budget for this month</Text>
            </GridItem>
            <GridItem bg="orange.400" p={4}>
                <Text>
                    {budgetData.totalIncome + budgetData.remainingBalance} $
                </Text>
            </GridItem>

            <GridItem bg="yellow.200" p={4}>
                <Text fontWeight="bold">Category</Text>
            </GridItem>
            <GridItem bg="yellow.300" p={4}>
                <Text fontWeight="bold">Budgeted</Text>
            </GridItem>
            <GridItem bg="yellow.400" p={4}>
                <Text fontWeight="bold">Left</Text>
            </GridItem>

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

            <GridItem colSpan={2} bg="green.200" p={4}>
                <Text fontWeight="bold">Unbudgeted</Text>
            </GridItem>
            <GridItem bg="green.400" p={4}>
                <Text>{unbudgeted.toFixed(2)} $</Text>
            </GridItem>

            <GridItem colSpan={2} bg="blue.200" p={4}>
                <Text fontWeight="bold">Total left</Text>
            </GridItem>
            <GridItem bg="blue.400" p={4}>
                <Text>{totalLeft} $</Text>
            </GridItem>
            <OpenModalButton modalType={"AddBudgetPlan"} modalProps={{ date: date }} />
        </Grid>
    );
};

export default BudgetLayout;

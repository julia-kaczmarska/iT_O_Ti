import React, { useEffect, useState } from "react";
import { Box, Grid, Text, VStack, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useCategories } from "../../../contexts/CategoriesContext";

const CategoriesBudgetForm = ({ date, totalIncome, onCategoryChange }) => {
    const [plannedForCat, setPlannedForCat] = useState([]);
    const { categories } = useCategories();

    const formatDateToBackend = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchPlannedForCat = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");

            try {
                const response = await fetch(
                    `http://localhost:8080/user/${userId}/getBudget/${formatDateToBackend(date)}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data.plannedBudgets)) {
                        setPlannedForCat(data.plannedBudgets);
                    } else {
                        setPlannedForCat([]);
                    }
                } else {
                    setPlannedForCat([]);
                }
            } catch (error) {
                console.error("Error fetching planned budgets:", error);
                setPlannedForCat([]);
            }
        };

        fetchPlannedForCat();
    }, [date]);

    useEffect(() => {
        onCategoryChange(plannedForCat);
    }, [plannedForCat, onCategoryChange]);

    const totalPlanned = plannedForCat.reduce(
        (sum, cat) => sum + (parseFloat(cat.plannedAmount) || 0),
        0
    );

    const remaining = totalIncome - totalPlanned;

    const handleCategoryChange = (id, value) => {
        setPlannedForCat((prevPlanned) =>
            prevPlanned.some((cat) => cat.categoryId === id)
                ? prevPlanned.map((cat) =>
                    cat.categoryId === id
                        ? { ...cat, plannedAmount: value } // Zapisujemy bez konwersji na liczbę
                        : cat
                )
                : [...prevPlanned, { categoryId: id, plannedAmount: value, spentAmount: 0 }]
        );
    };

    return (
        <VStack spacing={4} align="stretch">
            <Text
                fontWeight="bold"
                color={remaining >= 0 ? "green.500" : "red.500"}
            >
                {remaining >= 0
                    ? `Remaining: ${remaining.toFixed(2)} $`
                    : `Over budget: ${Math.abs(remaining).toFixed(2)} $`}
            </Text>
            <Grid
                templateColumns="2fr 1fr 1fr"
                alignItems="center"
                gap={4}
                fontWeight="bold"
            >
                <Text>Your categories</Text>
                <Text>Planned</Text>
                <Text>Percentage</Text>
            </Grid>
            {categories.map((category) => {
                const matchingCategory = plannedForCat.find(
                    (cat) => cat.categoryId === category.categoryId
                );

                const plannedAmount = matchingCategory
                    ? matchingCategory.plannedAmount
                    : "";

                const percentage =
                    totalIncome && plannedAmount !== "" && !isNaN(parseFloat(plannedAmount))
                        ? ((parseFloat(plannedAmount) / totalIncome) * 100).toFixed(2)
                        : "0.00";

                return (
                    <Grid
                        key={category.categoryId}
                        templateColumns="2fr 1fr 1fr"
                        alignItems="center"
                        gap={4}
                    >
                        <Text>{category.title}</Text>
                        <NumberInput
                            precision={2}
                            value={plannedAmount}
                            onChange={(valueAsString) => handleCategoryChange(category.categoryId, valueAsString)}
                            onBlur={() => {
                                // Po utracie focusu formatowanie do liczby z dwoma miejscami po przecinku
                                if (plannedAmount !== "" && !isNaN(parseFloat(plannedAmount))) {
                                    handleCategoryChange(
                                        category.categoryId,
                                        parseFloat(plannedAmount).toFixed(2)
                                    );
                                }
                            }}
                        >
                            <NumberInputField
                                placeholder="Enter amount"
                                pattern="[0-9]*[.,]?[0-9]*"
                                onChange={(e) => {
                                    // Obsługa przecinka/kropki
                                    const value = e.target.value.replace(",", ".");
                                    handleCategoryChange(category.categoryId, value);
                                }}
                            />
                        </NumberInput>
                        <Text>{percentage}%</Text>
                    </Grid>
                );
            })}
        </VStack>
    );
};

export default CategoriesBudgetForm;

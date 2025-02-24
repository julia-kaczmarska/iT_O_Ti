import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import IncomeBudgetForm from "./IncomeBudgetForm";
import CategoriesBudgetForm from "./CategoriesBudgetForm";
import PropTypes from "prop-types";
import {useModal} from "../../../contexts/ModalContext";

CategoriesBudgetForm.propTypes = {
    totalIncome: PropTypes.number,
    onCategoryChange: PropTypes.func,
};

const BudgetForm = ({ date, refreshBudgetData }) => {
    const { closeModal } = useModal();
    const [totalIncome, setTotalIncome] = useState(0);
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleSubmit = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");

            // Podziel dane na nowe i edytowane przychody
            const newIncomes = incomes.filter((income) => !income.cashflowRecordId);
            const updatedIncomes = incomes
                .filter((income) => income.cashflowRecordId)
                .map(({ cashflowRecordId, amount, categoryId, startDate, recordType, desc }) => ({
                    cashflowRecordId,
                    amount,
                    categoryId,
                    startDate,
                    recordType,
                    desc,
                }));

            // Tworzenie obiektu z danymi do wysyłki
            const budgetData = {
                firstOfMonth: date,
                totalIncome,
                remainingBalance: 0,
                plannedBudgets: categories,
            };

            console.log("Budget data being sent:", budgetData);

            // Dodawanie nowych przychodów
            if (newIncomes.length > 0) {
                await fetch(`http://localhost:8080/user/${userId}/addIncomes`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newIncomes),
                });
            }

            // Aktualizacja istniejących przychodów
            if (updatedIncomes.length > 0) {
                console.log(updatedIncomes)
                await fetch(`http://localhost:8080/user/${userId}/editRecords`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedIncomes),
                });
            }

            // Sprawdzenie, czy istnieje budżet na dany miesiąc
            const budgetExistsResponse = await fetch(
                `http://localhost:8080/user/${userId}/getBudget/${date}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (budgetExistsResponse.ok) {
                // Jeśli istnieje budżet, edytujemy go
                await fetch(`http://localhost:8080/user/${userId}/editBudget/${date}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(budgetData),
                });
            } else {
                // Jeśli budżet nie istnieje, tworzymy nowy
                await fetch(`http://localhost:8080/user/${userId}/createBudget`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(budgetData),
                });
            }

            console.log("Budget and incomes saved successfully.");
            refreshBudgetData();
            closeModal();
        } catch (error) {
            console.error("Error saving budget and incomes:", error);
        }
    };

    const isSubmitDisabled = incomes.some((income) => !income.amount || !income.desc);

    return (
        <Box p={6} bg="gray.50" borderRadius="md" shadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Planning budget
            </Text>

            <VStack spacing={8} align="stretch">
                <IncomeBudgetForm
                    date={date}
                    setTotalIncome={setTotalIncome}
                    setIncomes={setIncomes}
                />
                <CategoriesBudgetForm
                    date={date}
                    totalIncome={totalIncome}
                    onCategoryChange={(updatedCategories) => setCategories(updatedCategories)}
                />
            </VStack>

            <Button
                mt={6}
                colorScheme="green"
                onClick={handleSubmit}
                isDisabled={isSubmitDisabled}
            >
                Submit
            </Button>
        </Box>
    );
};

export default BudgetForm;

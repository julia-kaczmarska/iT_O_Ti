import React, { useEffect, useState } from "react";
import { Box, Grid, Input, Text, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DeleteButton from "../../MyButtons/DeleteButton";

const IncomeBudgetForm = ({ date, setTotalIncome, setIncomes }) => {
    const [localIncomes, setLocalIncomes] = useState([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("jwtToken");

            try {
                const response = await fetch(
                    `http://localhost:8080/user/${userId}/incomes?monthStartDate=${date}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setLocalIncomes(data.map((income) => ({ ...income, isNew: false })));
                    setTotalIncome(data.reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0));
                    setIncomes(data);
                } else {
                    console.log("No incomes found.");
                }
            } catch (error) {
                console.error("Error fetching incomes:", error);
            }
        };

        fetchIncomes();
    }, [date, setTotalIncome, setIncomes]);

    const handleAddIncome = () => {
        const newIncome = { id: Date.now(), amount: "", startDate: date, desc: "", isNew: true };
        const updatedIncomes = [...localIncomes, newIncome];
        setLocalIncomes(updatedIncomes);
        setIncomes(updatedIncomes);
    };

    const handleRemoveIncome = (id) => {
        const updatedIncomes = localIncomes.filter(
            (income) => income.cashflowRecordId !== id && income.id !== id
        );
        setLocalIncomes(updatedIncomes);
        setIncomes(updatedIncomes);
        setTotalIncome(updatedIncomes.reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0));
    };

    const handleInputChange = (id, field, value) => {
        const updatedIncomes = localIncomes.map((income) =>
            income.cashflowRecordId === id || income.id === id
                ? { ...income, [field]: value }
                : income
        );
        setLocalIncomes(updatedIncomes);
        setIncomes(updatedIncomes);

        if (field === "amount") {
            setTotalIncome(
                updatedIncomes.reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0)
            );
        }
    };

    return (
        <Box>
            <Text fontWeight="bold" mb={2}>
                Total income: {localIncomes.reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0)} $
            </Text>
            <Grid templateColumns="2fr 2fr 3fr auto" gap={4}>
                {localIncomes.map((income) => (
                    <React.Fragment key={income.cashflowRecordId || income.id}>
                        <NumberInput
                            value={income.amount}
                            placeholder="Income"
                            onChange={(valueAsString) =>
                                handleInputChange(
                                    income.cashflowRecordId || income.id,
                                    "amount",
                                    valueAsString
                                )
                            }
                            onBlur={() => {
                                if (income.amount !== "" && !isNaN(parseFloat(income.amount))) {
                                    handleInputChange(
                                        income.cashflowRecordId || income.id,
                                        "amount",
                                        parseFloat(income.amount).toFixed(2)
                                    );
                                }
                            }}
                        >
                            <NumberInputField
                                placeholder="Enter amount"
                                pattern="[0-9]*[.,]?[0-9]*"
                                onChange={(e) =>
                                    handleInputChange(
                                        income.cashflowRecordId || income.id,
                                        "amount",
                                        e.target.value.replace(",", ".")
                                    )
                                }
                            />
                        </NumberInput>
                        <Input
                            type="date"
                            placeholder="Date"
                            value={income.startDate || ""}
                            onChange={(e) =>
                                handleInputChange(income.cashflowRecordId || income.id, "startDate", e.target.value)
                            }
                        />
                        <Input
                            placeholder="Description"
                            value={income.desc || ""}
                            onChange={(e) =>
                                handleInputChange(income.cashflowRecordId || income.id, "desc", e.target.value)
                            }
                        />
                        <DeleteButton
                            recordIds={[income.cashflowRecordId || income.id]}
                            onDelete={() => handleRemoveIncome(income.cashflowRecordId || income.id)}
                        />
                    </React.Fragment>
                ))}
            </Grid>
            <Button
                leftIcon={<AddIcon />}
                mt={4}
                onClick={handleAddIncome}
                isDisabled={localIncomes.some((inc) => !inc.amount || !inc.desc)}
            >
                Add Income
            </Button>
        </Box>
    );
};

export default IncomeBudgetForm;

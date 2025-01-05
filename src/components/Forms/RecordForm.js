import React, { useEffect, useState } from 'react';
import { useCategories } from "../../contexts/CategoriesContext";
import {
    Button,
    FormControl,
    Grid,
    GridItem,
    Input,
    NumberInput,
    NumberInputField,
    Select
} from "@chakra-ui/react";
import Buttons from "../MyButtons/Buttons";
import moment from "moment";
import DeleteButton from "../MyButtons/DeleteButton";

const RecordForm = ({ isEdit, existingRecord, placeholderDate }) => {
    const { categories } = useCategories();
    const [recordId, setRecordId] = useState(isEdit ? existingRecord.cashflowRecordId : null);
    const [amount, setAmount] = useState(existingRecord ? existingRecord.amount : '');
    const [desc, setDesc] = useState(existingRecord ? existingRecord.desc : '');
    const [recordType, setRecordType] = useState(existingRecord ? existingRecord.recordType : 1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [catColor, setCatColor] = useState('');

    const [startDate, setStartDate] = useState(
        existingRecord ? existingRecord.startDate : placeholderDate ? moment(placeholderDate).format('YYYY-MM-DD') : ''
    );

    const [selectedDate, setSelectedDate] = useState(
        placeholderDate ? moment(placeholderDate).format('YYYY-MM-DD') : ''
    );

    // Dodanie logów do useEffect
    useEffect(() => {
        console.log("useEffect triggered");
        console.log("isEdit:", isEdit);
        console.log("existingRecord:", existingRecord);
        console.log("categories:", categories);

        if (isEdit && existingRecord && existingRecord.categoryId) {
            const matchingCategory = categories.find(
                (category) => category.categoryId === existingRecord.categoryId
            );
            console.log("Matching category:", matchingCategory);
            if (matchingCategory) {
                setSelectedCategory(matchingCategory.title); // Ustawiamy tytuł jako wartość
                setCatColor(matchingCategory.color);
            } else {
                console.log("No matching category found");
            }
        }
    }, [isEdit, existingRecord, categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form...");
        console.log("Selected category:", selectedCategory);

        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        const finalStartDate = startDate || selectedDate;

        if (!finalStartDate) {
            console.error("Start date is missing");
            return;
        }

        const adjustedStartDate = moment(finalStartDate, 'YYYY-MM-DD')
            .set({ hour: 12, minute: 0, second: 0 })
            .toISOString();

        const categoryId = categories.find(category => category.title === selectedCategory)?.categoryId;

        console.log("Category ID for submission:", categoryId);

        const newRecord = {
            amount: parseFloat(amount),
            startDate: adjustedStartDate,
            recordType: recordType,
            desc,
            categoryId, // Przekazujemy `categoryId`, znalezione na podstawie `selectedCategory`
        };

        console.log("Payload:", newRecord);

        const url = isEdit
            ? `http://localhost:8080/user/${userId}/records/${recordId}`
            : `http://localhost:8080/user/${userId}/addrecords`;

        fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
        })
            .then((response) => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(isEdit ? 'Record updated:' : 'Record added:', data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl>
                <Grid
                    m={3}
                    templateColumns="auto auto 1fr"
                    gap={4}
                    alignItems="center"
                >
                    <GridItem>
                        <Button
                            onClick={() => setRecordType(false)}
                            opacity={recordType ? '45%' : '100%'}
                        >
                            +
                        </Button>
                    </GridItem>
                    <GridItem>
                        <Button
                            onClick={() => setRecordType(true)}
                            opacity={recordType ? '100%' : '45%'}
                        >
                            -
                        </Button>
                    </GridItem>
                    <GridItem>
                        <NumberInput
                            borderColor="#ffffff"
                            precision={2}
                            value={amount}
                            max={999999}
                            placeholder="Cashflow amount"
                            onChange={(valueAsString, valueAsNumber) => setAmount(valueAsNumber)}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </GridItem>
                </Grid>

                <Input
                    borderColor='#ffffff'
                    m={3}
                    placeholder="Your cashflow description :)"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Input
                    borderColor='#ffffff'
                    m={3}
                    type="date"
                    value={startDate ? startDate : selectedDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Select
                    bg = {selectedCategory ? catColor : null}
                    borderColor='#ffffff'
                    m={3}
                    required
                    value={selectedCategory || ""}
                    placeholder="Choose a category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Buttons label="Confirm" onClick={handleSubmit} />
            {isEdit && (
                <DeleteButton
                    recordId={existingRecord.cashflowRecordId}
                    onDelete={(id) => {
                        console.log(`Record with id ${id} deleted.`);
                    }}
                />
            )}
        </form>
    );
};

export default React.memo(RecordForm);

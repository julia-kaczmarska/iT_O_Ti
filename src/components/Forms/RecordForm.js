import React, { useState } from 'react';
import {useCategories} from "../../contexts/CategoriesContext";
import {Button, FormControl, Grid, GridItem, Input, NumberInput, NumberInputField, Select} from "@chakra-ui/react";
import Buttons from "../MyButtons/Buttons";
import moment from "moment";

const RecordForm = ({ isEdit, existingRecord, onClose, onRecordSaved, placeholderDate }) => {
    const { categories, error } = useCategories();
    const [amount, setAmount] = useState(existingRecord ? existingRecord.amount : '');
    const [desc, setDesc] = useState(existingRecord ? existingRecord.desc : '');
    const [recordType, setRecordType] = useState(existingRecord ? existingRecord.recordType : true);
    const [selectedCategory, setSelectedCategory] = useState(existingRecord ? existingRecord.category : null);

    const [startDate, setStartDate] = useState(
        existingRecord ? existingRecord.startDate : placeholderDate ? moment(placeholderDate).format('YYYY-MM-DD') : ''
    );

    const [selectedDate, setSelectedDate] = useState(
        placeholderDate ? moment(placeholderDate).format('YYYY-MM-DD') : ''
    );



    console.log('Selected date:', selectedDate);

    const handleRecordTypeChange = (type) => {
        setRecordType(type);
    };

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')



    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        // Upewnij się, że `startDate` lub `selectedDate` jest poprawnie ustawione
        const finalStartDate = startDate || selectedDate;

        if (!finalStartDate) {
            console.error("Start date is missing");
            return;
        }

        const adjustedStartDate = moment(finalStartDate, 'YYYY-MM-DD')
            .set({ hour: 12, minute: 0, second: 0 })
            .toISOString();

        const newRecord = {
            amount: parseFloat(amount),
            startDate: adjustedStartDate, // Przekazujemy jako ISO string z "neutralnym" czasem
            recordType: recordType ? true : false,
            desc,
            categoryId: parseInt(selectedCategory),
        };


        console.log("Wysyłane dane:", newRecord);

        fetch(`http://localhost:8080/user/${userId}/addrecords`, {
            method: 'POST',
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
            <FormControl onSubmit={handleSubmit}>
                <Grid
                    m={3}
                    templateColumns="auto auto 1fr"
                    gap={4}
                    alignItems="center"
                >
                    <GridItem>
                        <Button onClick={() => handleRecordTypeChange(0)} bg="#ffffff">+</Button>
                    </GridItem>
                    <GridItem>
                        <Button onClick={() => handleRecordTypeChange(1)} bg="#ffffff">-</Button>
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
                    label= 'Description'
                    placeholder= 'Your cashflow description :)'
                    required ={true}
                    onChange = {(e) => setDesc(e.target.value)}
                />
                <Input
                    borderColor='#ffffff'
                    m={3}
                    type="date"
                    value={startDate ? startDate : selectedDate}
                    required={true}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Select
                    borderColor='#ffffff'
                    m={3}
                    label= 'Choose the cashflow category'
                    required={true}
                    // value={field.value}
                    placeholder='Choose a category'
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.title}
                        </option>
                    ))}
                </Select>
            </FormControl>
        <Buttons label='Confirm' onClick={handleSubmit}/>
        </form>

);
};

export default RecordForm;

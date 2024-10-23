import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Switch, VStack } from '@chakra-ui/react';
import Categories from '../Categories/Categories';
import {jwtDecode} from "jwt-decode"; // Komponent do wyboru kategorii

const RecordForm = ({ isEdit, existingRecord, onClose, onRecordSaved }) => {
    const [amount, setAmount] = useState(existingRecord ? existingRecord.amount : '');
    const [date, setDate] = useState(existingRecord ? existingRecord.date : '');
    const [recordType, setRecordType] = useState(existingRecord ? existingRecord.recordType : true); // true dla wydatku, false dla przychodu
    const [category, setCategory] = useState(existingRecord ? existingRecord.category : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token found');
            localStorage.clear();
            window.location.href = '/auth/login';
        }
        const userId = jwtDecode(token).sub;

        const newRecord = {
            amount,
            date,
            recordType: recordType ? 'Wydatek' : 'Przychód',
            category,
        };

        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit
            ? `http://localhost:8080/user/${userId}/records/${existingRecord.id}`
            : `http://localhost:8080/user/${userId}/records`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(isEdit ? 'Record updated:' : 'Record added:', data);
                onRecordSaved(); // Wywołaj funkcję do aktualizacji listy rekordów
                onClose(); // Zamknij formularz po zapisaniu
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Date"
                    required
                />
                <Switch
                    isChecked={recordType}
                    onChange={(e) => setRecordType(e.target.checked)}
                    id="recordType"
                >
                    {recordType ? 'Expense' : 'Income'}
                </Switch>
                <Select
                    placeholder="Select Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <Categories />
                </Select>
                <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
            </VStack>
        </form>
    );
};

export default RecordForm;

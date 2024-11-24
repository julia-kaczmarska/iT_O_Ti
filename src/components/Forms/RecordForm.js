import React, { useState } from 'react';
import Form from "./Form";
import {useCategories} from "../../contexts/CategoriesContext";

const RecordForm = ({ isEdit, existingRecord, onClose, onRecordSaved, placeholderDate }) => {
    const { categories, error } = useCategories();
    const [amount, setAmount] = useState(existingRecord ? existingRecord.amount : '');
    const [desc, setDesc] = useState(existingRecord ? existingRecord.desc : '');
    const [recordType, setRecordType] = useState(existingRecord ? existingRecord.recordType : true);
    const [selectedCategory, setSelectedCategory] = useState(existingRecord ? existingRecord.category : '');

    const [startDate, setStartDate] = useState(existingRecord ? existingRecord.startDate : null);

    const [selectedDate, setSelectedDate] = useState(
        placeholderDate ? placeholderDate.toISOString().split('T')[0] : ''
    )

    const fields = [
        {
            label: 'Amount',
            type: 'text',
            name: 'amount',
            placeholder: 'Amount',
            required: true,
            onChange: (e) => setAmount(e.target.value),
        },
        {
            label: 'Description',
            type: 'text',
            name: 'desc',
            placeholder: 'Your cashflow record descritpion',
            required: true,
            onChange: (e) => setDesc(e.target.value),
        },
        {
            label: 'Date',
            type: 'date',
            name: 'date',
            value : startDate ? startDate : selectedDate,
            required: true,
            onChange: (e) => setStartDate(e.target.value),
        },
        {
            label: 'Expense?',
            type: 'switch',
            name: 'choice',
            // placeholder: 'Choose the cashflow type',
            // defaultValue: true,
            onChange: (e) => setStartDate(e.target.value),
        },
        {
            label: 'Choose the cashflow category',
            type: 'select',
            name: 'Category',
            placeholder: '',
            required: true,
            onChange: (e) => setSelectedCategory(e.target.value),
            options: categories.map((category) => ({
                label: category.title,
                value: category.categoryId
            })),
        },
    ]
    console.log('Selected date:', selectedDate);


    const handleSubmit = (e) => {
        e.preventDefault();


        const token = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('userId');

        // Upewnij się, że startDate jest ustawione
        if (!startDate) {
            console.error("Start date is missing");
            return;
        }

        const newRecord = {
            amount: parseFloat(amount),
            startDate,
            recordType: recordType ? true : false,
            desc,
            categoryId: parseInt(selectedCategory),
        };

        console.log("Wysyłane dane:", newRecord); // Debug

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
        <Form onSubmit={handleSubmit}
              fields={fields}
              buttonText={isEdit ? "Update" : "Add"}>
        </Form>
    );
};

export default RecordForm;

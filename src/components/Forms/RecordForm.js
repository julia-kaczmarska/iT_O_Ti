import React, { useState } from 'react';

const RecordForm = () => {
    const fields = [
        {label: ''}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementacja logiki zapisu
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEdit ? 'Edit Record' : 'Add Record'}</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
            />
            <input
                type="checkbox"
                checked={recordType}
                onChange={(e) => setRecordType(e.target.checked)}
            />
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                {/* Lista kategorii */}
            </select>
            <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default RecordForm;

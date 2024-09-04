import React, { useState } from 'react';
import Form from "./Form";

const CategoryForm = ({ isEdit, category }) => {
    const [title, setTitle] = useState(category ? category.title : '');
    const fields = [
        { label: 'Category', type: 'text', name: 'title', value:"title",
            placeholder: 'Enter category title', required: true }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementacja logiki zapisu
    };

    return (
        <div>
        <h2>{isEdit ? 'Edit category' : 'Add category'}</h2>
        <Form label={isEdit ? 'Edit Category' : 'Add Category'}
              fields={fields} onSubmit={setTitle} buttonText={isEdit ? 'Update' : 'Create'} />
        </div>
    );
};

export default CategoryForm;

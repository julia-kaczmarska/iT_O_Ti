import React, { useState } from 'react';
import Form from "./Form";

const CategoryForm = ({ isEdit, category, userId }) => {
    const [title, setTitle] = useState(category ? category.title : '');

    const fields = [
        {
            label: 'Category',
            type: 'text',
            name: 'title',
            value: title,
            placeholder: 'Enter category title',
            required: true,
            onChange: (e) => setTitle(e.target.value), // Zaktualizuj stan przy każdej zmianie
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCategory = { title };

        const url = isEdit ? `http://localhost:3000/user/1/editcat/${category.id}` : `http://localhost:8080/user/1/addcat`;
        const method = isEdit ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(isEdit ? 'Category updated:' : 'Category added:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div>
            <h2>{isEdit ? 'Edit category' : 'Add category'}</h2>
            <Form
                label={isEdit ? 'Edit Category' : 'Add Category'}
                fields={fields}
                onSubmit={handleSubmit} // Zaktualizowano, aby obsługiwał submit
                buttonText={isEdit ? 'Update' : 'Create'}
            />
        </div>
    );
};

export default CategoryForm;

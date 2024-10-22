import React, { useState } from 'react';
import Form from "./Form";
import { jwtDecode } from "jwt-decode";

const CategoryForm = ({ isEdit, category, onClose, onCategoryAdded }) => {
    const [title, setTitle] = useState(category ? category.title : '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token found');
        }

        const userId = jwtDecode(token).sub;
        const newCategory = { title };

        const url = isEdit ? `http://localhost:8080/user/${userId}/editcat/${category.id}` : `http://localhost:8080/user/${userId}/addcat`;
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
                onCategoryAdded(); // Wywołaj funkcję odświeżenia kategorii
                onClose(); // Zamknij modal
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
                fields={[
                    {
                        label: 'Category',
                        type: 'text',
                        name: 'title',
                        value: title,
                        placeholder: 'Enter category title',
                        required: true,
                        onChange: (e) => setTitle(e.target.value),
                    }
                ]}
                onSubmit={handleSubmit}
                buttonText={isEdit ? 'Update' : 'Create'}
            />
        </div>
    );
};

export default CategoryForm;

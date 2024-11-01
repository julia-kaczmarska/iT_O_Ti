import React, { useState } from 'react';
import Form from "./Form";
import { jwtDecode } from "jwt-decode";

const CategoryForm = ({ category, onClose, onCategoryAdded }) => {
    const [title, setTitle] = useState(category ? category.title : '');
    const [color, setColor] = useState(category ? category.color : '');


    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token found');
            localStorage.clear();
            window.location.href = '/auth/login';
        }

        const userId = localStorage.getItem("userId");
        const newCategory = { title, color };

        fetch(`http://localhost:8080/user/${userId}/addcategory`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
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
                console.log('Category added:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div>
            <Form
                fields={[
                    {
                        label: 'Title',
                        type: 'text',
                        name: 'title',
                        value: title,
                        placeholder: 'Enter category title',
                        required: true,
                        onChange: (e) => setTitle(e.target.value),
                    },
                    {
                        label: 'Color',
                        type: 'text',
                        name: 'color',
                        value: color,
                        placeholder: 'Enter category color',
                        required: true,
                        onChange: (e) => setColor(e.target.value),
                    }]
                }
                onSubmit={handleSubmit}
                buttonText={'Create'}
            />
        </div>
    );
};

export default CategoryForm;

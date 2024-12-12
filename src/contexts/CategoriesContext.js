import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch(`http://localhost:8080/user/${userId}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch categories');

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const updateCategory = (updatedCategory) => {
        setCategories(categories.map(category =>
            category.categoryId === updatedCategory.categoryId ? updatedCategory : category
        ));
    };

    const deleteCategory = async (categoryId) => {
        console.log("Attempting to delete category with ID:", categoryId); // Debug log
        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://localhost:8080/user/${userId}/category/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Server response:", response); // Debug log

            if (!response.ok) throw new Error('Failed to delete category');

            setCategories(categories.filter(category => category.categoryId !== categoryId));
            console.log("Category deleted successfully"); // Debug log
        } catch (error) {
            setError(error.message);
            console.error('Error deleting category:', error);
        }
    };


    return (
        <CategoriesContext.Provider value={{ categories, updateCategory, deleteCategory, error }}>
            {children}
        </CategoriesContext.Provider>
    );
};

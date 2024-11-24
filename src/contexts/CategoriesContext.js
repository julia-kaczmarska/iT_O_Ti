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

    return (
        <CategoriesContext.Provider value={{ categories, updateCategory, error }}>
            {children}
        </CategoriesContext.Provider>
    );
};

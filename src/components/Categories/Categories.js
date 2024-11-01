import React, { useEffect, useState } from 'react';
import DrawerNavigation from "../pages/DrawerNavigation";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    //////////////////////////////////////////////////
    useEffect(() => {
        console.log("Fetched categories:", categories);
    }, [categories]);
    //////////////////////////////////////////////////

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const userId = localStorage.getItem('userId');
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
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const updateCategory = (updatedCategory) => {
        setCategories(categories.map(cat =>
            cat.categoryId === updatedCategory.categoryId ? updatedCategory : cat
        ));
    };

    return <DrawerNavigation categories={categories} updateCategory={updateCategory} />;
};

export default Categories;

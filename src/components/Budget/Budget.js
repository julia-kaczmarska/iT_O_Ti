import { useEffect, useState } from 'react';

const Budget = ({ userId }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Pobieranie tokena JWT z localStorage
                const response = await fetch(`http://localhost:8080/user/${userId}/cats`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Dodanie nagłówka autoryzacyjnego
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // Wyświetl status i body w przypadku błędu
                    console.error(`HTTP error: ${response.status}`);
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
            <div>
                <h2>User Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.categoryId}>{category.title}</li>
                    ))}
                </ul>
            </div>
    );
};

export default Budget;

import { useEffect, useState } from 'react';

const Budget = ({ userId }) => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/cats`);

                if (!response.ok) {
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

    return(
      <div className="budget">

          <div>
              <h2>User Categories</h2>
              <ul>
                  {categories.map((category) => (
                      <li key={category.categoryId}>{category.title}</li>
                  ))}
              </ul>
          </div>

      </div>
    );
}

export default Budget;
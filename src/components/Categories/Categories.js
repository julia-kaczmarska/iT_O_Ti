import React from 'react';
import { Box } from '@chakra-ui/react';

const Categories = ({ categories = [] }) => {
    return (
        <Box mb={3}>
            {categories.map((category) => (
                <Box key={category.categoryId}>
                    {category.title}
                </Box>
            ))}
        </Box>
    );
};

export default Categories;
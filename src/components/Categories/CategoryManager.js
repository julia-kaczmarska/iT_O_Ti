import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCategories } from "../../contexts/CategoriesContext";
import EditableCategory from "./EditableCategory";
import ColorPoint from "./ColorPoint";

const CategoryManager = () => {
    const { categories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 8;

    const pageCount = Math.ceil(categories.length / categoriesPerPage);
    const indexOfFirstCategory = (currentPage - 1) * categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfFirstCategory + categoriesPerPage);

    return (
        <Box>
            {categories && categories.length > 0 ? (
                <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={4}>
                    {currentCategories.map(category => (
                        <Flex key={category.categoryId} align="center">
                            <ColorPoint category={category} mr={4} />
                            <EditableCategory category={category} flex="1" />
                        </Flex>
                    ))}
                </Grid>
            ) : (
                <Text>No categories available</Text>
            )}
            {pageCount > 1 && (
                <Flex justifyContent="space-between" p={4}>
                    <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        {"<"}
                    </Button>
                    <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>
                        {">"}
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default CategoryManager;

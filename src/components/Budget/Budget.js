import {Text, SimpleGrid, Stack, Table, TableCaption, TableContainer, Thead, Th} from "@chakra-ui/react";

const Budget = ({}) => {


    return (
            <Stack>
                <SimpleGrid columns={2}>
                    <Text> Budget for month -- $$month </Text>
                    <Text> $$amount </Text>
                </SimpleGrid>
                <TableContainer>
                    <Table variant={'simple'}>
                        <Thead>
                            <Th>Category</Th>
                            <Th>Budgeted</Th>
                            <Th>Left</Th>
                        </Thead>
                    </Table>
                </TableContainer>

            </Stack>
    );
};

export default Budget;

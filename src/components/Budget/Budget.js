import {Text, SimpleGrid, Stack, Table, TableCaption, TableContainer, Thead} from "@chakra-ui/react";

const Budget = ({}) => {


    return (
            <Stack>
                <SimpleGrid columns={2}>
                    <Text> Budget for month -- $$month </Text>
                    <Text> $$amount </Text>
                </SimpleGrid>
                <TableContainer>
                    <Table variant={'simple'}>
                        <TableCaption> IDK </TableCaption>
                        <Thead> mmm </Thead>
                    </Table>
                </TableContainer>

            </Stack>
    );
};

export default Budget;

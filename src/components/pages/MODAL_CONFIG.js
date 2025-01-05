import RecordForm from "../Forms/RecordForm";
import React from "react";
import CategoryForm from "../Forms/CategoryForm";
import Buttons from "../MyButtons/Buttons";
import CategorySettings from "../Categories/CategorySettings";
import ColorPoints from "../Categories/ColorPoints";
import {Box, Grid} from "@chakra-ui/react";

const MODAL_CONFIG = {
    'CategorySettings': {
        label: 'Category settings',
        content: (
            <Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                    <ColorPoints />
                    <CategorySettings />
                </Grid>
                <Buttons label="Add category" />
            </Box>
        ),
    },
    'AddCategory': {
        label: 'Add category',
        content: <CategoryForm isEdit={false} />,
    },
    'AddRecord': {
        label: '+',
        content: (props) => (
            <RecordForm isEdit={false} placeholderDate={props.placeholderDate}/>
        ),
    },
    'EditRecord': {
        label: 'Edit record',
        content: (props) => (
            <RecordForm
                isEdit={true}
                // placeholderDate={props.placeholderDate}
                existingRecord={props.existingRecord}
            />
        ),
    },
    'ShowMoreRecords': {
        label: 'More records',
        content: (props) => (
            <Box>
                {props.records.map((record, index) => (
                    <Box
                        key={index}
                        onClick={() => props.onRecordClick(record)}
                        style={{ marginBottom: '5px', cursor: 'pointer' }}
                    >
                        {record.desc} - {record.amount}
                    </Box>
                ))}
            </Box>
        ),
    },
};

export default MODAL_CONFIG


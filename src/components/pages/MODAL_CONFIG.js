import RecordForm from "../Forms/RecordForm";
import React from "react";
import CategoryForm from "../Forms/CategoryForm";

import {Box, Grid} from "@chakra-ui/react";

const MODAL_CONFIG = {
    // 'EditableCategory': {
    //     label: 'Category settings',
    //     content: (
    //         <Box>
    //             <Grid templateColumns="repeat(2, 1fr)" gap={1}>
    //                 <ColorPoint />
    //                 <EditableCategory />
    //             </Grid>
    //             <Buttons label="Add category" />
    //         </Box>
    //     ),
    // },
    'AddCategory': {
        label: 'Add category',
        content: <CategoryForm isEdit={false} />,
    },
    'AddRecord': {
        label: 'Add record',
        content: (props) => (
            <RecordForm
                isEdit={false}
                dateFromCal={props.dateFromCal}/>
        ),
    },
    'EditRecord': {
        label: 'Edit record',
        content: (props) => (
            <RecordForm
                isEdit={true}
                refreshEvents={props.refreshEvents}
                existingRecord={props.existingRecord}
            />
        ),
    },
    'ShowMoreRecords': {
        label: 'More records',
        content: (props= {}) => (
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


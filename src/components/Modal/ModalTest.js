import * as React from 'react';
import { useState } from "react";
import CategoryForm from "../Forms/CategoryForm";

export default function ModalTest() {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openCategoryForm = (isEdit = true, category = null) => {
        setModalContent(<CategoryForm isEdit={isEdit} category={category} />);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button onClick={() => openCategoryForm()} variant="secondary">
                Add Category

            </button>
            {open && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>

                            {modalContent}

                            <div style={actionStyle}>
                                <button type="button" onClick={handleClose} style={buttonStyle}>Cancel</button>
                            </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '400px',
    maxWidth: '100%',
    zIndex: 1001,
};

const actionStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
};

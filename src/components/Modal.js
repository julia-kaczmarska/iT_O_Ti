import React, { useEffect, useState } from 'react';
import CategoryForm from "./Forms/CategoryForm";

const Modal = ({ content, open, handleClose}) => {
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        switch (content) {
            case 'Add category':
                setModalContent(<CategoryForm isEdit={false} />);
                break;
            case 'Edit category':
                setModalContent(<CategoryForm isEdit={true} />);
                break;
            // Możesz dodać inne przypadki
            default:
                console.log(`Unknown content type: ${content}`);
                break;
        }
    }, [content]);



    return (
        <div>
            {open && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        {modalContent}
                        <div>
                            <button className='form-button' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;


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


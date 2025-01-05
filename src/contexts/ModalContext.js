import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalType, setModalType] = useState(null);
    const [modalProps, setModalProps] = useState({});

    const openModal = (type, props = {}) => {
        console.log('Opening modal:', type, props); // Debugowanie
        setModalType(type);
        setModalProps(props);
    };

    const closeModal = () => {
        setModalType(null);
        setModalProps({});
    };

    return (
        <ModalContext.Provider value={{ modalType, modalProps, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

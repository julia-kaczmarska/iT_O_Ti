import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

let modalOpenCount = 0; // Licznik globalny w pliku ModalContext
export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalProps, setModalProps] = useState({});

    const openModal = (type, props = {}) => {
        if (isOpen) return;

        setModalType(type);
        setModalProps(props);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalType(null);
        setModalProps({});
    };

    return (
        <ModalContext.Provider value={{ isOpen, modalType, modalProps, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Budget from "../Budget/Budget";
import MyCalendar from "../Calendar/Calendar";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <div>
            <header>
                <React.Fragment>
                    <button onClick={() => openModal('Add category')}>Add Category</button>
                </React.Fragment>
            </header>

            <main>
                <MyCalendar />
                <Budget />
            </main>

            {/* Modal */}
            <Modal content={modalContent} open={open} handleClose={closeModal} />


        </div>
    );
};

export default Dashboard;

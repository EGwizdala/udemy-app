import React from "react";
import Modal from '../Modal';

interface WarningInterface {
    handleOnClose: () => void;
    isModalOpen: boolean;
    children: React.ReactNode
}

const WarningDialog = ({ handleOnClose, isModalOpen, children }: WarningInterface) => {
    const handleOnCloseModal = (e: any) => {
        e.preventDefault();
        handleOnClose();
    }
    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} sholudBeCloseOnOutsideClick={true}>
            {children}
            <button onClick={handleOnCloseModal} type="button">Zamknij</button>
        </Modal>
)   
}

export default WarningDialog;


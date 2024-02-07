import React from 'react';
import "./DeletePostModal.css"

const DeleteConfirmationModal = ({ isOpen, onDeleteConfirm, onCancel }) => {
    if (!isOpen) return null;

    // Function to stop the propagation of click events
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="delete-modal" onClick={onCancel}>
            <div className="delete-modal-content" onClick={stopPropagation}>
                <p>Are you sure you want to delete?</p>
                <button onClick={onDeleteConfirm}>Yes, Delete</button>
                <button onClick={onCancel}>No, I don't want to delete</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

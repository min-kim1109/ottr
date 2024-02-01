import React from 'react';
import "./DeletePostModal.css"

const DeleteConfirmationModal = ({ isOpen, onDeleteConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Are you sure you want to delete?</p>
                <button onClick={onDeleteConfirm}>Yes, Delete</button>
                <button onClick={onCancel}>No, I don't want to delete</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

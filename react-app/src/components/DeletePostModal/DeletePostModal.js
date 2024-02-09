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
                <div className="are-u-sure">
                    <p>Are you sure you want to delete?</p>
                </div>
                <div className="yes-delete-container">
                    <button onClick={onDeleteConfirm} className="yes-delete">Yes, Delete</button>
                </div>
                <div className="no-delete-container">
                    <button onClick={onCancel} className="no-delete">No, I don't want to delete</button>
                </div>

            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

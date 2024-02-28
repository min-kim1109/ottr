import React, { useEffect } from 'react';
import './Modal.css'; // Ensure you have this CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEscapeClose = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Attach the event listener
        document.addEventListener('keydown', handleEscapeClose);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('keydown', handleEscapeClose);
        };
    }, [onClose]); // Dependencies array ensures this effect is only re-run if onClose changes

    if (!isOpen) return null;

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>

                {children}
            </div>
        </div>
    );
};

export default Modal;

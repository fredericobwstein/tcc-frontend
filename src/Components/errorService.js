import React from 'react';
import ReactDOM from 'react-dom';

export const ErrorModal = ({ isOpen, onRequestClose, message }) => (
    isOpen ? (
        <div className="error-modal">
            <div className="error-modal-content">
                <h2>Warning</h2>
                <p>{message}</p>
                <button onClick={onRequestClose}>Close</button>
            </div>
        </div>
    ) : null
);

export const showErrorModal = (message) => {
    const modalDiv = document.createElement('div');
    document.body.appendChild(modalDiv);

    const closeModal = () => {
        ReactDOM.unmountComponentAtNode(modalDiv);
        document.body.removeChild(modalDiv);
    };

    ReactDOM.render(<ErrorModal isOpen={true} onRequestClose={closeModal} message={message} />, modalDiv);
};

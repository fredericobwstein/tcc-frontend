import React from 'react';

const Register = ({ openRegisterModal }) => {
    return (
        <div className="register-form">
            <button onClick={openRegisterModal}>Register</button>
        </div>
    );
};

export default Register;

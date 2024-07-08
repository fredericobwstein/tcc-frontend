import React from 'react';

const UserBox = ({ user, handleLogout }) => {
    return (
        <div className="user-box">
            <h2>Hello, {user.nome}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserBox;

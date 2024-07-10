import React, { useState } from 'react';

const Login = ({ handleLogin, email, setLogin, senha, setPassword, error }) => {
    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

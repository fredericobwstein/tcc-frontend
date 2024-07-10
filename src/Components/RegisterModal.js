import React, { useState } from 'react';
import Modal from 'react-modal';

export const RegisterModal = ({ isOpen, onRequestClose, onRegister }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();       
    try {
        const response = await fetch(`${process.env.REACT_APP_XD}/api/Usuario/Cadastro`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            senha: senha,
            nome: nome,
          }),
        });
      
        if (response.ok) {
          const data = await response.text();
          localStorage.setItem('token', data.token);
          onRegister(data); 
          setError('Register successfully!'); 
        } else {
          const errorText = await response.text();
          const match = errorText.match(/^(.+?) at/);
          const errorMessage = match ? match[1].trim() : "This email is already registered.";
          setError(errorMessage);
        }
    } catch (error) {
        setError('Network error');
    }
  };

  const onRequestCloseHandler = () => {
    setError(''); 
    onRequestClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Register"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="modal-content">
        <h2>Cadastre-se</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="nome">Name:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Password:</label>
            <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit">Register</button>
          {error && <p style={{ color: error.includes('sucesso') ? 'green' : 'red' }}>{error}</p>}
          </form>
        <button onClick={onRequestCloseHandler} className="modal-close-button">Close</button>
        </div>
    </Modal>
  );
};

export default RegisterModal;

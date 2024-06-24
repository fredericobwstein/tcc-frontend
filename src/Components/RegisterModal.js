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
        const response = await fetch('https://localhost:7281/api/Usuario/Cadastro', {
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
          setError('Registro concluído com sucesso!'); 
        } else {
          const errorText = await response.text();
          const match = errorText.match(/^(.+?) at/);
          const errorMessage = match ? match[1].trim() : "Ocorreu um erro durante o registro. Tente novamente.";
          setError(errorMessage);
        }
    } catch (error) {
        setError('Erro de rede: ' + error.message);
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
      contentLabel="Cadastro"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="modal-content">
        <h2>Cadastre-se</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit">Registrar</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <button onClick={onRequestCloseHandler} className="modal-close-button">Fechar</button>
        </div>
    </Modal>
  );
};

export default RegisterModal;

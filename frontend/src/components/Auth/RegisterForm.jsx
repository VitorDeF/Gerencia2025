import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await registerUser({ username, password });
            navigate('/login');
        } catch (err) {
            setError('Falha no cadastro. Tente novamente.');
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register-form">
            <h2>Cadastro</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuário:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            <button
                type="button"
                style={{ marginTop: '1rem', width: '100%', background: '#bdbdbd', color: '#222' }}
                onClick={handleGoToLogin}
            >
                Ir para o Login
            </button>
        </div>
    );
};

export default RegisterForm;
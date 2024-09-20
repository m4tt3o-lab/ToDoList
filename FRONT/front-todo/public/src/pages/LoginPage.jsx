import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;

    body.style.margin = '0';
    body.style.fontFamily = 'Arial, sans-serif';
    body.style.backgroundColor = '#f0f2f5';
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';
    body.style.height = '100vh';

    return () => {
        body.style.margin = '';
        body.style.fontFamily = '';
        body.style.backgroundColor = '';
        body.style.display = '';
        body.style.justifyContent = '';
        body.style.alignItems = '';
        body.style.height = '';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        setUsername('');
        setPassword('');
        navigate('/TaskList');
      } else {
        setUsername('');
        setPassword('');
        alert('Login failed');

      }
    } catch (error) {
      console.error('Errore durante la richiesta di login:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles.inputGroup}>
        <h1>Login</h1>
        <label htmlFor="username" className={styles.label}>Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Login</button>
      <div className={styles.registerLink}>
        <span>Non hai un account? </span>
        <a onClick={() => navigate('/register')} className={styles.link}>Registrati qui</a>
      </div>
    </form>
  );
}

export default LoginPage;

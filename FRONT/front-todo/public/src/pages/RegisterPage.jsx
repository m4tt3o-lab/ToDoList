import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

function RegisterPage() {
    const [newUsername, setUsername] = useState('');
    const [newPassword, setPassword] = useState('');
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

    const dataPost = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/auth/register";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword
                }),
            });
            if (response.ok) {
                setTimeout(() => {
                    alert('Registrazione avvenuta con successo');
                }, 1500);

                setUsername('');
                setPassword('');
                navigate('/Login');
            } else {
                console.error("Registrazione fallita.");
            }
        } catch (error) {
            console.error("Errore durante la richiesta di registrazione:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Registrazione</h1>
            <form onSubmit={dataPost}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Nome Utente</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
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
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className={styles.input} 
                    />
                </div>
                <button type="submit" className={styles.btn}>Registrati</button>
            </form>
            <p className={styles.loginPrompt}>
                Hai già un account? <a href="/Login" className={styles.loginLink}>Accedi qui</a>
            </p>
        </div>
    );
}

export default RegisterPage;

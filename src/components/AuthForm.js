import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' | 'error'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignup(prev => !prev);
        setMessage('');
        setMessageType('');
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setMessageType('');

        // Normalize email before sending — belt-and-suspenders alongside the server
        const payload = {
            ...formData,
            email: formData.email.toLowerCase().trim(),
        };

        const url = isSignup
            ? `${process.env.REACT_APP_API_URL}/signup`
            : `${process.env.REACT_APP_API_URL}/login`;

        try {
            const response = await axios.post(url, payload);

            if (isSignup && response.status === 201) {
                setMessage('Account created! Please log in with your credentials.');
                setMessageType('success');
                setIsSignup(false);
                // Full reset — user types fresh credentials for login
                setFormData({ name: '', email: '', password: '' });
            }

            if (!isSignup && response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                navigate('/home');
            }

        } catch (error) {
            const msg = error.response?.data?.message || 'An error occurred. Please try again.';
            setMessage(msg);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="parentl-container">
            <div className="forml-container">
                <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="forml-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                autoComplete="name"
                            />
                        </div>
                    )}

                    <div className="forml-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>

                    <div className="forml-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            autoComplete={isSignup ? 'new-password' : 'current-password'}
                        />
                    </div>

                    <button
                        type="submit"
                        className="forml-button"
                        disabled={loading}
                    >
                        {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                {message && (
                    <p style={{ color: messageType === 'success' ? 'green' : 'red', marginTop: '10px' }}>
                        {message}
                    </p>
                )}

                <div className="switchl-link">
                    <p>
                        {isSignup ? (
                            <>
                                Already have an account?{' '}
                                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'brown' }}>
                                    Log in
                                </span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'brown' }}>
                                    Sign up
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;

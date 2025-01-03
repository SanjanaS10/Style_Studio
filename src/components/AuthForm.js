import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignup(!isSignup);
        setMessage('');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isSignup ? 'http://localhost:5000/signup' : 'http://localhost:5000/login';
        try {
            const response = await axios.post(url, formData);
            console.log(response); // Log the response to the console
            setMessage(response.data.message);
            if (response.status === 200 || response.status === 201) {
                navigate('/home'); // Redirect to Homepage
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
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
                        />
                    </div>
                    <button type="submit" className="forml-button">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>
                <p>{message}</p>
                <div className="switchl-link">
                    <p>
                        {isSignup ? (
                            <>
                                Already have an account?{' '}
                                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'brown' }}>Log in</span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'brown' }}>Sign up</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;

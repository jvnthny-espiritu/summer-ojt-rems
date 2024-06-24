import React, { useState } from 'react';

const Login = () => {


    const [rcc, setRCC] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      // Login logic later
        console.log('RCC:', rcc);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="rcc">Research Center Code:</label>
                    <input
                        type="rcc"
                        id="rcc"
                        value={rcc}
                        onChange={(e) => setRCC(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
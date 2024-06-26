import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Header = () => {
    return (
        <header className="header" class="flex flex-col bg-zinc-400 p-6 items-center">
            <h1 class="text-l font-medium">STEERHub</h1>
            <h2 class="text-l font-medium">Personal log-in Page</h2>
        </header>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const [rcCode, setRCCode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('api/auth/login', {
                code: rcCode,
                password: password
            });
            console.log('Response:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div class = "w-full">
            <div>
                <Header />
            </div>
            <div class="p-6">
                <form onSubmit={handleSubmit}>
                    <div class= "my-5 flex flex-col items-center">
                        <label htmlFor="rcCode">Research Center Code</label>
                        <input class="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/4 mt-1x p-2"
                            type="rcCode"
                            id="rcCode"
                            value={rcCode}
                            onChange={(e) => setRCCode(e.target.value)}
                            required
                            placeholder="MRC"
                        />
                    </div>
                    
                    <div class= "my-5 flex flex-col items-center">
                        <label htmlFor="password">Password</label>
                        <input class="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/4 mt-1 p-2"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    {/* replace later with the actual password reset */}
                    <div class="flex flex-col items-center">
                        <p class= "text-sm mt-12 font-bold"> Forgot Password? <Link to="/" class="text-blue-500 hover:text-purple-500"> click here</Link></p>
                        <button type="submit" class= "p-1 bg-black rounded-md text-white w-1/6 text-md my-4 hover:bg-blue-950">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
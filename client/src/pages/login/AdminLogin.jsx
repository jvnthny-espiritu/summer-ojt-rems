import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// const Header = () => {
//     return (
//         <header className="header" className="flex flex-col bg-zinc-400 p-6 items-center">
//             <h1 className="text-l font-medium">STEERHub</h1>
//             <h2 className="text-l font-medium">Admin Log-In</h2>
//         </header>
//     );
// };

const AdminLogin = ({handleAdminLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('api/auth/login', {
                code: username,
                password: password
            });
            console.log('Response:', response.data);
            localStorage.setItem('token', response.data.token);
            if(response.status===200){
                navigate('/admin');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-3 font-base m-5 min-h-screen min-w-screen">
            <div className="border-4 border-red-700 rounded-3xl w-1/3">
                <div className="h-40">
                    {/* TODO Insert image later*/}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className= "my-8 flex flex-col items-center">
                        <label htmlFor="username">Username</label>
                        <input className="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/2 mt-1 p-2"
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="MRC"
                        />
                    </div>
                    
                    <div className= "my-5 flex flex-col items-center">
                        <label htmlFor="password">Password</label>
                        <input className="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/2 mt-1 p-2"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <button type="submit" className= "p-1 bg-red-700 rounded-md text-white w-1/6 text-md my-4">Login</button>
                    </div>
                </form>
                <div className="flex flex-row-reverse my-5 mr-9">
                    <button onClick={handleAdminLogin} className="text-red-700 rounded-lg border-2 border-red-700 w-16">User</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;


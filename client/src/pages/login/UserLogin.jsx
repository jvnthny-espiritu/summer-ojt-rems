import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
const Header = () => {
    return (
        <header class="header" className="flex flex-col p-6 items-center">
            <h1 className="text-l font-medium">STEERHub</h1>
            <h2 className="text-l font-medium">Staff Log-In</h2>
        </header>
    );
};

const UserLogin = ({handleAdminLogin}) => {
    const [rcCode, setRCCode] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
      // Login logic later
        console.log('RCC:', rcCode);
        console.log('Password:', password);
    };

    return (
        // TODO Make conditional -- switch between admin or user
        <>
            <Box sx={{position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)', border: "3px solid", borderColor:"rgba(350,0,0)", borderRadius:"20px", width: "525px", height: "600px"}}>
                <div>
                    <Header />
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className= "my-5 flex flex-col items-center">
                            <label htmlFor="rcCode">Research Center Code</label>
                            <input className="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/2 mt-1x p-2"
                                type="rcCode"
                                id="rcCode"
                                value={rcCode}
                                onChange={(e) => setRCCode(e.target.value)}
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
                        {/* replace later with the actual password reset */}
                        <div className="flex flex-col items-center">
                            <p className= "text-sm mt-6 font-bold"> Forgot Password? <Link to="/" className="text-blue-500 hover:text-purple-500"> click here</Link></p>
                            <button type="submit" className= "p-1 bg-red-700 rounded-md text-white w-1/6 text-md my-4">Login</button>
                        </div>
                    </form>
                    <div className="flex flex-row-reverse my-20 mr-3">
                        <Button onClick={handleAdminLogin} className="text-red-700 border-2 rounded-lg border-red-700 w-16">Admin</Button>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default UserLogin;
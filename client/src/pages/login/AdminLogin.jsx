import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// const Header = () => {
//     return (
//         <header className="header" class="flex flex-col bg-zinc-400 p-6 items-center">
//             <h1 class="text-l font-medium">STEERHub</h1>
//             <h2 class="text-l font-medium">Admin Log-In</h2>
//         </header>
//     );
// };

const AdminLogin = ({handleAdminLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
      // Login logic later
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <>
            <Box sx={{position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)', border: "3px solid", borderColor:"rgba(350,0,0)", borderRadius: "20px", width: "525px", height: "600px"}}>
                <div class="h-1/3">
                    {/* Insert image later*/}
                </div>
                <form onSubmit={handleSubmit}>
                    <div class= "my-8 flex flex-col items-center">
                        <label htmlFor="username">Username</label>
                        <input class="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/2 mt-1x p-2"
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="MRC"
                        />
                    </div>
                    
                    <div class= "my-5 flex flex-col items-center">
                        <label htmlFor="password">Password</label>
                        <input class="border-2 border-zinc-600 opacity-50 hover:border-black rounded-lg w-1/2 mt-1 p-2"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <div class="flex flex-col items-center">
                        <button type="submit" class= "p-1 bg-red-700 rounded-md text-white w-1/6 text-md my-4">Login</button>
                    </div>
                </form>
                <div class="flex flex-row-reverse my-5 mr-9">
                    <Button onClick={handleAdminLogin} class="text-red-700 rounded-lg border-2 border-red-700 w-16">User</Button>
                </div>
            </Box>
        </>
    );
};

export default AdminLogin;

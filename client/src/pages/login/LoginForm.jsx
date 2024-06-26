import React, { useState } from 'react';
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";

const LoginForm = () => {
    const [adminLoginOpen, setAdminLoginOpen] = useState(false)

    const handleAdminLogin = () =>{
        setAdminLoginOpen(!adminLoginOpen);    
    };

    let loginContent;

    if(adminLoginOpen) {
        loginContent = <AdminLogin handleAdminLogin={handleAdminLogin}/>
    } else {
        loginContent = <UserLogin handleAdminLogin={handleAdminLogin}/>
    }

    return (
        <div className="w=full">
            <div>
                {loginContent}
            </div>
        </div>
    );
};

export default LoginForm;
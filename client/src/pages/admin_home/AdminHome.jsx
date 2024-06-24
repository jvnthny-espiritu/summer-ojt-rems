import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div class = "w-full">
            <div>
                <p>Welcome {"MRC_00"}</p>
            </div>
            <div>
                <h2>
                    3D Printers
                </h2>
                <ul>
                    <li>Ultimaker</li>
                    <li>Ultimaker</li>
                    <li>Creality</li>
                </ul>
            </div>

            <div>
                <h2>
                CNC Machines        
                </h2>
                <ul>
                <li>Ultimaker</li>
                <li>Ultimaker</li>
                <li>Creality</li>
                </ul>
            </div>

            <div>
                <h2>
                CNC Machines        
                </h2>
                <ul>
                <li>Ultimaker</li>
                <li>Ultimaker</li>
                <li>Creality</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminHome;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CenterHome = () => {
    const devices = [
        {id:1, type:"3D Printer", name:"Ultimaker1"},
        {id:2, type:"3D Printer", name:"Ultimaker2"},
        {id:3, type:"3D Printer", name:"Ultimaker3"},
        {id:4, type:"CNC Machine", name:"CNC_1"},
        {id:5, type:"CNC Machine", name:"CNC_2"},
        {id:6, type:"Laser Cut", name:"Laser_1"},
        {id:7, type:"Laser Cut", name:"Laser_2"},
    ]

    const deviceTypes = devices.reduce((current, device) => {
        if (!current[device.type]) {
            current[device.type] = [];
        }
        current[device.type].push(device);
        return current;
    }, {});
    return (
        <div class = "w-full">
            <div>
                <p>Welcome {"MRC_00"}</p>
            </div>
            <div>
                {Object.keys(deviceTypes).map((type) => (
                    <div key={type}>
                    <h3>{type}</h3>
                    <ul>
                        {deviceTypes[type].map((device) => (
                        <li key={device.id}>{device.name}</li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CenterHome;
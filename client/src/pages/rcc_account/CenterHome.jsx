import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div class = "w-full">
            <div>
                <p>Welcome {"Admin"}</p>
            </div>
            <div>
            </div>
        </div>
    );
};

const UserHome = () => {
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
    return(
        <div class = "w-full">
            <div class="flex flex-col items-center bg-zinc-400 p-6">
                <p>Welcome {"MRC_00"}</p>
            </div>
            <div class="flex flex-col p-6">
                {Object.keys(deviceTypes).map((type) => (
                    <div key={type}>
                    <h3 class="text-lg mt-8 font-bold">{type}</h3>
                    <ul class="w-2/5">
                        {deviceTypes[type].map((device) => (
                        <li key={device.id}>
                            <div class="w-1.8/2 text-md mt-2 grid grid-cols-3">
                                <p class="p-1 mr-7 ml-5 col-span-2">
                                    {device.name}
                                </p>
                                {/* Change to links later */}
                                <button class="p-1 bg-black rounded-md text-white w-1/3 text-sm hover:bg-blue-950">View</button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
        </div>
    )
};

const StaffHome = () => {
    let content;
    // change later when login logic is complete
    if(false){
        content = <AdminHome />
    }else {
        content = <UserHome />
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default StaffHome;
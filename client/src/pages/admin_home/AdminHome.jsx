import React, { useState } from 'react';
import Button from '@mui/material/Button';
import NewRc from './NewRC'
import EditRc from './EditRC'

const AdminHome = () => {
    const [newOpenState, setNewOpenState] = useState(false);
    const handleNewOpenState = () =>{
        setNewOpenState(!newOpenState)
    }

    const [editOpenState, setEditOpenState] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const handleEditOpen = (user) => {
        setCurrentUser(user);
        setEditOpenState(true);
    };
    const handleEditClose = () => {
        setCurrentUser(null);
        setEditOpenState(false);
    };
    const users = [
        {id:1, name: "Manufacturing Research Center", rcCode:"MRC_00", password: "tempPass123"},
        {id:2, name: "Manufacturing Research Center",rcCode:"MTCC_00", password: "tempPass123"},
        {id:3, name: "Manufacturing Research Center",rcCode:"GIS_00", password: "tempPass123"},
        {id:4, name: "Manufacturing Research Center",rcCode:"ESRC_00", password: "tempPass123"},
        {id:5, name: "Center For Technopreneurship and Internship",rcCode:"CTI_00", password: "tempPass123"},
        {id:6, name: "Manufacturing Research Center",rcCode:"DTC_00", password: "tempPass123"},
    ]

    return (
        <div class = "w-full">
            <div class="flex flex-row justify-between border-b-2 border-red-700 px-16 py-6">
                <p class="text-red-700 text-xl text font-bold">Users List</p>
                <Button class="p-1 bg-red-700 rounded-md text-white w-1/6 text-xs" onClick={handleNewOpenState}>Add Research Center</Button>
                {newOpenState && (
                    <NewRc newOpenState={newOpenState} handleNewOpenState={handleNewOpenState}/>
                )}
            </div>
            <div class="flex flex-col w-full">
                <ul>
                    {users.map((user) => (
                    <li key={user.id}>
                        <div class="border-b-2 border-red-700 text-md my-8 pb-6 flex justify-between px-16 py-1">
                            <p class="ml-20">
                                {user.name}
                            </p>
                            <p class="flex flex-col text-xs font-thin text-neutral-700">
                                Code: {user.rcCode} <br></br>
                                Password: *********
                            </p>
                            {/* Change to links later */}
                            <Button class="p-1 bg-red-700 rounded-md text-white w-20 text-sm mr-8" onClick={() => handleEditOpen(user)}>Edit</Button>
                            {editOpenState && (
                                <EditRc editOpenState={editOpenState} handleEditOpenState={handleEditClose} researchCenterInfo={currentUser}/>
                            )}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminHome;
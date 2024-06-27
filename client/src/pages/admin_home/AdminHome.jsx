import React, { useState, useEffect  } from 'react';
import NewRc from './NewRC'
import EditRc from './EditRC'
import api from '../../services/api';

const AdminHome = () => {
    const [newOpenState, setNewOpenState] = useState(false);
    const handleNewOpenState = () =>{
        setNewOpenState(!newOpenState)
    }

    const handleNewOpenUpdateState = () =>{
        fetchData();
        setNewOpenState(false);
    }

    const [editOpenState, setEditOpenState] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');

    const [userList, setUserList] = useState([]);
    const handleEditOpen = (user) => {
        setCurrentUser(user);
        setEditOpenState(true);
    };
    
    const handleEditClose = () => {
        fetchData()
        setCurrentUser(null);
        setEditOpenState(false);
    };
    
    const handleDeleteUpdate = () =>{
        fetchData()
        setEditOpenState(false)
    }

    const fetchData = async (e) =>{
        try {
            const response = await api.get('api/research-centers');
            setUserList(response.data)
            // TODO replace when routing is complete
            //navigate('/admin');
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className = "grid grid-cols-3 w-full">
            <div className="w-full col-span-3 flex justify-between border-b-2 border-red-700 px-8 py-6">
                <p className="text-red-700 text-xl text font-bold">Users List</p>
                <button className="p-1 bg-red-700 rounded-md text-white w-1/6 text-xs" onClick={handleNewOpenState}>Add Research Center</button>
                {newOpenState && (
                    <NewRc newOpenState={newOpenState} handleNewOpenState={handleNewOpenState} handleNewOpenUpdateState={handleNewOpenUpdateState}/>
                )}
            </div>
            <div className="col-span-3 w-full">
                <ul>
                    {userList.map((user) => (
                    <li key={user.id}>
                        <div className="border-b-2 border-red-700 text-md my-8 pb-6 flex justify-between px-16 py-1">
                            <p className="w-1/6">
                                {user.name}
                            </p>
                            <p className="w-1/5 text-xs font-thin text-neutral-700">
                                Code: {user.code} <br></br>
                                Password: *********
                            </p>
                            {/* Change to links later */}
                            <button className="p-1 bg-red-700 rounded-md text-white w-20 text-sm mr-8" onClick={() => handleEditOpen(user)}>Edit</button>
                            {editOpenState && (
                                <EditRc editOpenState={editOpenState} handleEditOpenState={handleEditClose} researchCenterInfo={currentUser} handleDeleteUpdate={handleDeleteUpdate}/>
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
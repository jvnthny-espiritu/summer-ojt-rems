import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../../services/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};

const EditRc = ({editOpenState,handleEditOpenState, researchCenterInfo, handleDeleteUpdate}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setPasswordTwo] = useState('');
    const [RCCode, setRCCode] = useState('');
    const [error, setError] = useState('');

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () =>{
        setDeleteOpen(!deleteOpen)
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.delete(`/api/research-centers/${researchCenterInfo.id}`);
            console.log('Response:', response.data);
            handleDeleteOpen()
            handleDeleteUpdate()
        } catch (error) {
            setError("Delete Failed.")
            console.error('Error:', error);
        }
    };

    const RCCDeleteDialog = ({openState, handleDeleteClose}) =>{
        return (
            <Modal
            open={openState}
            onClose={handleDeleteClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 300 }}>
                    <div className="flex flex-col items-center">
                        <p id="child-modal-description" className="mt-4 mb-3">
                            Are you sure?
                        </p>
                        <div className="flex flex-row gap-8 mt-5 mb-1">
                            <button onClick={handleDeleteSubmit} className="p-1 bg-red-700 rounded-xl text-white w-20 text-md ">Yes</button>
                            <button onClick={handleDeleteClose} className="p-1 border-2 border-red-700 rounded-xl text-red-700 w-20 text-md">No</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        )
    }

    useEffect(() => {
        setName(researchCenterInfo.name)
        setRCCode(researchCenterInfo.code)
    }, [researchCenterInfo]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO pag kinukuha password, hashed value binabalik
            if(reEnterPassword!==password){
                setPassword("");
                setPasswordTwo("");
                setError("Update failed. Passwords don't match.");
                throw error
            }
            const response = await api.put(`/api/research-centers/${researchCenterInfo.id}`, {
                name: name, 
                code: RCCode, 
                password: password, 
            });
            console.log('Response:', response.data);
            handleEditOpenState()
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
    <React.Fragment>
        <Modal
            open={editOpenState}
            onClose={handleEditOpenState}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            hideBackdrop = {true}
            >
            <Box sx={{ ...style, width: 500 }}>
                <div className="mt-3">
                    <form onSubmit={handleEditSubmit}>
                        <div className= "my-5 flex flex-col py-6">
                            <p className="text-red-700 text-lg text font-bold my-6">Edit Research Center</p>
                            <div>
                                <label>Name
                                    <input className="border-2 w-full border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                        name = "editName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder= "Material Research Center"
                                    />
                                </label>
                            </div>
                            
                            <div>
                                <label>Research Center Code
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                        name = "editRCCode"
                                        value={RCCode}
                                        onChange={(e) => setRCCode(e.target.value)}
                                        required
                                        placeholder="MRC_00"
                                    />
                                </label>
                            </div>

                            <div>
                                <label>Password
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                    />
                                </label>
                            </div>
                            
                            <div>
                                <label>Re-enter Password
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                        name="editReEnterPassword"
                                        type="password"
                                        value={reEnterPassword}
                                        onChange={(e) => setPasswordTwo(e.target.value)}
                                        required
                                        placeholder="Re-enter Password"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-4 mt-12 mb-4">
                            <button onClick={handleEditOpenState} className="p-1 border-2 border-red-700 rounded-xl text-red-700 w-1/5 text-md">Cancel</button>
                            <button onClick={handleDeleteOpen} className="p-1 bg-red-700 rounded-xl text-white w-1/4 text-sm">Delete</button>
                            { deleteOpen && (
                                    <RCCDeleteDialog openState={deleteOpen} handleDeleteClose={handleDeleteOpen} />
                            )}
                            <button onClick={handleEditSubmit} type="submit" className= "p-1 bg-red-700 rounded-xl text-white w-1/5 text-md">Save</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    </React.Fragment>
    );
}

export default EditRc;
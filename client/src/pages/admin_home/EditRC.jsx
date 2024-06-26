import React, {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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

const RCCDeleteDialog = ({openState, handleDeleteClose}) =>{
    return (
        <Modal
        open={openState}
        onClose={handleDeleteClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
            <Box sx={{ ...style, width: 300 }}>
                <div class="flex flex-col items-center">
                    <p id="child-modal-description" class="mt-4 mb-3">
                        Are you sure?
                    </p>
                    <div class="flex flex-row gap-8 mt-5 mb-1">
                        {/* TODO Change save when backend is implemented */}
                        <Button onClick={handleDeleteClose} class="p-1 bg-red-700 rounded-xl text-white w-20 text-md ">Yes</Button>
                        <Button onClick={handleDeleteClose} class="p-1 border-2 border-red-700 rounded-xl text-red-700 w-20 text-md">No</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

const EditRc = ({editOpenState,handleEditOpenState, researchCenterInfo}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
      // Login logic later
        console.log('RCC:', RCCode);
        console.log('Password:', password);
    };

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setPasswordTwo] = useState('');
    const [RCCode, setRCCode] = useState('');

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () =>{
        setDeleteOpen(!deleteOpen)
    }

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
                <div class="mt-3">
                    <form onSubmit={handleSubmit}>
                        <div class= "my-5 flex flex-col py-6">
                            <p class="text-red-700 text-lg text font-bold my-6">Edit Research Center</p>
                            <label htmlFor="name">Name</label>
                            <input class="border-2 border-zinc-600 opacity-85 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder={researchCenterInfo.name}
                            />
                            <label htmlFor="RCCode">Research Center Code</label>
                            <input class="border-2 border-zinc-600 opacity-85 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="RCCode"
                                id="RCCode"
                                value={RCCode}
                                onChange={(e) => setRCCode(e.target.value)}
                                required
                                placeholder={researchCenterInfo.rcCode}
                            />
                            <label htmlFor="password">Password</label>
                            <input class="border-2 border-zinc-600 opacity-85 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                            <label htmlFor="reEnterPassword">Re-enter Password</label>
                            <input class="border-2 border-zinc-600 opacity-85 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="password"
                                id="reEnterPassword"
                                value={reEnterPassword}
                                onChange={(e) => setPasswordTwo(e.target.value)}
                                required
                                placeholder="Re-enter Password"
                            />
                        </div>
                        <div class="flex flex-row-reverse gap-4 mt-12 mb-4">
                            <button onClick={handleEditOpenState} class="p-1 border-2 border-red-700 rounded-xl text-red-700 w-1/5 text-md">Cancel</button>
                            <Button onClick={handleDeleteOpen} class="p-1 bg-red-700 rounded-xl text-white w-1/4 text-sm">Delete</Button>
                            { deleteOpen && (
                                    <RCCDeleteDialog openState={deleteOpen} handleDeleteClose={handleDeleteOpen} />
                            )}
                            <button type="submit" class= "p-1 bg-red-700 rounded-xl text-white w-1/5 text-md">Save</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    </React.Fragment>
    );
}

export default EditRc;
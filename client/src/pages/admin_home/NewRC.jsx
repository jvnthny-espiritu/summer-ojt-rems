import React, {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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


const NewRc = ({newOpenState,handleNewOpenState}) => {
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

    return (
    <React.Fragment>
        <Modal
            open={newOpenState}
            onClose={handleNewOpenState}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            hideBackdrop = {true}
            >
            <Box sx={{ ...style, width: 500 }}>
                <div className="mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className= "my-5 flex flex-col py-6">
                            <p className="text-red-700 text-lg text font-bold my-6">Add New Research Center</p>
                            <label htmlFor="name">Name</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Name"
                            />
                            <label htmlFor="RCCode">Research Center Code</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="RCCode"
                                id="RCCode"
                                value={RCCode}
                                onChange={(e) => setRCCode(e.target.value)}
                                required
                                placeholder="Research Center Code"
                            />
                            <label htmlFor="password">Password</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter Password"
                            />
                            <label htmlFor="reEnterPassword">Re-enter Password</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                type="password"
                                id="reEnterPassword"
                                value={reEnterPassword}
                                onChange={(e) => setPasswordTwo(e.target.value)}
                                required
                                placeholder="Re-enter Password"
                            />
                        </div>
                        <div className="flex flex-row-reverse gap-4 mt-12 mb-4">
                            <button onClick={handleNewOpenState} className="p-1 border-2 border-red-700 rounded-xl text-red-700 w-1/5 text-md">Cancel</button>
                            <button type="submit" className= "p-1 bg-red-700 rounded-xl text-white w-1/5 text-md">Add</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    </React.Fragment>
    );
}

export default NewRc;
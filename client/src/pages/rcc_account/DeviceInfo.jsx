import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

const DeleteDialog = ({openState, handleDeleteClose}) =>{
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
                        {/* TODO Change save when backend is implemented */}
                        <button onClick={handleDeleteClose} className="p-1 bg-black rounded-md text-white w-20 text-md hover:bg-white hover:text-black">Yes</button>
                        <button onClick={handleDeleteClose} className="p-1 bg-black rounded-md text-white w-20 text-md hover:bg-white hover:text-black">No</button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

const DeviceInfo = ({open,handleClose,device}) => {
    const [editable, setEditable] = useState(false);

    const handleEditable = () =>{
        setEditable(true)
    }

    const closeEditable = () =>{
        setEditable(false)
    }

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () =>{
        setDeleteOpen(true)
    }
    const handleDeleteClose = () =>{
        setDeleteOpen(false)
    }

    return (
    <React.Fragment>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            hideBackdrop = {true}
            >
            <Box sx={{ ...style, width: 500 }}>
                <div className="text-md mt-2 grid grid-cols-3">
                    <h2 id="child-modal-title" className="col-span-2">{device.name}</h2> 
                    <button onClick={handleClose} className="text-red-600">EXIT</button>
                </div>
                
                    {editable?(
                        <div className="mt-3">
                            <div>
                                <div className="flex flex-row gap-3">
                                    <p className="mt-3"> Status: </p><TextField label="Status" variant="outlined" size = "small" margin="dense"></TextField>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="mt-4"> Last Used: </p> <TextField label="Last Used" variant="outlined" size = "small" margin="dense"></TextField>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="mt-4">Device Model: </p> <TextField label="Device Model" variant="outlined" size = "small" margin="dense"></TextField>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="mt-4">Serial #: </p><TextField label="Serial No." variant="outlined" size = "small" margin="dense"></TextField>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="mt-4"> Property #: </p><TextField label="Property No." variant="outlined" size = "small" margin="dense"></TextField>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleClose} className="p-1 bg-black rounded-md text-white w-1/4 text-sm hover:bg-white hover:text-black">Save</button>
                                <button onClick={closeEditable} className="p-1 bg-black rounded-md text-white w-1/5 text-md hover:bg-white hover:text-black">Cancel</button>
                            </div>
                        </div>
                    ): (
                        // TODO make dynamic
                        <div className="mt-3">
                            <div>
                                <p id="child-modal-description">
                                    Status: {}
                                </p>
                                <p id="child-modal-description">
                                    Last Used: {}
                                </p>
                                <p id="child-modal-description">
                                    Device Model: {}
                                </p>
                                <p id="child-modal-description">
                                    Serial #: {}
                                </p>
                                <p id="child-modal-description">
                                    Property #: {}
                                </p>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleDeleteOpen} className="p-1 bg-black rounded-md text-white w-1/4 text-sm hover:bg-white hover:text-black">Remove Device</button>
                                <button onClick={handleEditable} className="p-1 bg-black rounded-md text-white w-1/5 text-md hover:bg-white hover:text-black">Edit</button>
                                { deleteOpen && (
                                    <DeleteDialog openState={deleteOpen} handleDeleteClose={handleDeleteClose} />
                                )}
                            </div>
                        </div>
                    )}
            </Box>
        </Modal>
    </React.Fragment>
    );
}

export default DeviceInfo;
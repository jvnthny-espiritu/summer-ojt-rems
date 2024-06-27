import React, {useState, useEffect} from "react";
import {Box,Select, MenuItem, InputLabel, FormControl, Modal} from '@mui/material';
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

const DeviceInfo = ({open,handleClose,equipment}) => {
    const [editable, setEditable] = useState(false);

    const [status, setStatus] = useState("");
    const [model, setModel] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [inventoryNo, setInventoryNo] = useState("");
    const [type, setType] = useState("");
    const [researchCenterId, setresearchCenterId] = useState(0);

    const [error, setError] = useState('');

    const handleEditable = () =>{
        setEditable(!editable)
    }

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteDialogState = () =>{
        setDeleteOpen(!deleteOpen)
    }
    useEffect(() => {
        setStatus(equipment.status)
        setModel(equipment.model)
        setSerialNo(equipment.serialNo)
        setInventoryNo(equipment.inventoryNo)
        setType(equipment.type)
        setresearchCenterId(equipment.researchCenterId)
    }, [equipment]);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/equipments/${equipment.id}`, {
                type: type, 
                model: model, 
                serialNo: serialNo, 
                inventoryNo: inventoryNo, 
                status: status, 
                researchCenterId: researchCenterId
            });
            console.log('Response:', response.data);
            handleClose()
        } catch (error) {
            setError("Update Failed.")
            console.error('Error:', error);
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.delete(`/api/equipments/${equipment.id}`);
            console.log('Response:', response.data);
            handleClose()
        } catch (error) {
            setError("Delete Failed.")
            console.error('Error:', error);
        }
    };

    const DeleteDialog = ({openState, handleDeleteDialogState}) =>{
        return (
            <Modal
            open={openState}
            onClose={handleDeleteDialogState}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 300 }}>
                    <div className="flex flex-col items-center">
                        <p id="child-modal-description" className="mt-4 mb-3">
                            Are you sure?
                        </p>
                        <div className="flex flex-row gap-8 mt-5 mb-1">
                            <button onClick={handleDeleteSubmit} className="p-1 bg-black rounded-md text-white w-20 text-md hover:bg-white hover:text-black">Yes</button>
                            <button onClick={handleDeleteDialogState} className="p-1 bg-black rounded-md text-white w-20 text-md hover:bg-white hover:text-black">No</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        )
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
                    <h2 id="child-modal-title" className="col-span-2">{equipment.name}</h2> 
                    <button onClick={handleClose} className="text-red-600">EXIT</button>
                </div>
                
                    {editable?(
                        <div className="mt-3">
                            <div>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="type">Type</label>
                                        <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                            type="type"
                                            id="type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            placeholder="3D Printer"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="model">Model</label>
                                        <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                            type="model"
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            placeholder="Ultimaker"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="serialNo">Serial Number</label>
                                        <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                            type="serialNo"
                                            id="serialNo"
                                            value={serialNo}
                                            onChange={(e) => setSerialNo(e.target.value)}
                                            placeholder="###"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="inventoryNo">Inventory Number</label>
                                        <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                            type="inventoryNo"
                                            id="inventoryNo"
                                            value={inventoryNo}
                                            onChange={(e) => setInventoryNo(e.target.value)}
                                            placeholder="###"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="equipment-status-label">Status</InputLabel>
                                            <Select
                                            labelId="equipment-status-label"
                                            id="equipment-status"
                                            name="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            label="Status"
                                            >
                                                <MenuItem value="available">Available</MenuItem>
                                                <MenuItem value="for repair">For Repair</MenuItem>
                                                <MenuItem value="work-in-progress">Work-In-Progress</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <label htmlFor="researchCenterId">Research Center ID</label>
                                        <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2"
                                            type="researchCenterId"
                                            id="researchCenterId"
                                            value={researchCenterId}
                                            onChange={(e) => setresearchCenterId(e.target.value)}
                                            placeholder="###"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleEditable} className="p-1 bg-black rounded-md text-white w-1/5 text-md hover:bg-white hover:text-black">Cancel</button>
                                <button onClick={handleEditSubmit} className="p-1 bg-black rounded-md text-white w-1/4 text-sm hover:bg-white hover:text-black">Save</button>
                            </div>
                        </div>
                    ): (
                        // TODO make dynamic
                        <div className="mt-3">
                            <div>
                                <p id="child-modal-description">
                                    Status: {equipment.status}
                                </p>
                                <p id="child-modal-description">
                                    Last Used: {equipment.updatedAt}
                                </p>
                                <p id="child-modal-description">
                                    Device Model: {equipment.model}
                                </p>
                                <p id="child-modal-description">
                                    Serial Number: {equipment.serialNo}
                                </p>
                                <p id="child-modal-description">
                                    Property Number: {equipment.inventoryNo}
                                </p>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleDeleteDialogState} className="p-1 bg-black rounded-md text-white w-1/4 text-sm hover:bg-white hover:text-black">Remove Device</button>
                                <button onClick={handleEditable} className="p-1 bg-black rounded-md text-white w-1/5 text-md hover:bg-white hover:text-black">Edit</button>
                                { deleteOpen && (
                                    <DeleteDialog openState={deleteOpen} handleDeleteClose={handleDeleteDialogState} />
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
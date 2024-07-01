import React, {useState, useEffect} from "react";
import {Modal} from '@mui/material';
import api from '../../services/api';

const DeviceInfo = ({open,handleClose,equipment,handleChangesAfterClose}) => {
    const [editable, setEditable] = useState(false);

    const [status, setStatus] = useState("");
    const [model, setModel] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [inventoryNo, setInventoryNo] = useState("");
    const [type, setType] = useState("");
    const [researchCenterId, setresearchCenterId] = useState("");

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
            handleChangesAfterClose()
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
            handleChangesAfterClose()
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
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className="flex flex-col justify-center items-center gap-3 font-base m-5">
                <div className="flex flex-col border-2 border-black w-auto h-auto bg-white p-6 gap-3">
                    <div className="flex flex-col items-center">
                        <p id="child-modal-description" className="mt-4 mb-3">
                            Are you sure?
                        </p>
                        <div className="flex flex-row gap-8 mt-5 mb-1">
                            <button onClick={handleDeleteSubmit} className="p-1 bg-red-800 rounded-2xl text-white w-20 text-md">Yes</button>
                            <button onClick={handleDeleteDialogState} className="p-1 bg-white border-2 border-red-800 rounded-2xl text-red-800 w-20 text-md">No</button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
    <React.Fragment>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            hideBackdrop = {true}
            className="flex flex-col justify-center items-center gap-3 font-base m-5"
            >
            <div className="flex flex-col border-2 border-black w-1/2 h-auto bg-white p-6 gap-3">
                <div className="my-6">
                    <h2 id="parent-modal-title" className="col-span-2 text-lg font-bold text-red-800">{equipment.type + " > " + equipment.model}</h2> 
                </div>
                    {editable?(
                        <div className="mt-3">
                            <div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="status">Status</label>

                                    <button 
                                        onClick={() => setStatus("available")} 
                                        className={`p-1 rounded-2xl w-1/5 text-sm ${status === "available" ? "bg-green-800 text-white": "bg-white border-2 border-green-800 text-green-800"}`}>Available
                                    </button>

                                    <button 
                                        onClick={() => setStatus("for repair")} 
                                        className={`p-1 rounded-2xl w-1/4 text-sm ${status === "for repair" ? "bg-red-800 text-white": "bg-zinc-200 border-2 border-red-800 text-red-800"}`}>For Repair
                                    </button>

                                    <button 
                                        onClick={() => setStatus("work-in-progress")} 
                                        className={`p-1 rounded-2xl w-1/5 text-sm ${status === "work-in-progress" ? "bg-orange-600 text-white": "bg-zinc-200 border-2 border-orange-600 text-orange-600"}`}>Work In Progress
                                    </button>
                                </div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="type">Type</label>
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                        type="type"
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        placeholder="3D Printer"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="model">Model</label>
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                        type="model"
                                        id="model"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        placeholder="Ultimaker"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="serialNo">Serial Number</label>
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                        type="serialNo"
                                        id="serialNo"
                                        value={serialNo}
                                        onChange={(e) => setSerialNo(e.target.value)}
                                        placeholder="###"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="inventoryNo">Inventory Number</label>
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                        type="inventoryNo"
                                        id="inventoryNo"
                                        value={inventoryNo}
                                        onChange={(e) => setInventoryNo(e.target.value)}
                                        placeholder="###"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 p-2">
                                    <label htmlFor="researchCenterId">Research Center ID</label>
                                    <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                        type="researchCenterId"
                                        id="researchCenterId"
                                        value={researchCenterId}
                                        onChange={(e) => setresearchCenterId(e.target.value)}
                                        placeholder="###"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleEditable} className="p-1 bg-white border-2 border-red-800 rounded-2xl text-red-800 w-1/5 text-md">Cancel</button>
                                <button onClick={handleEditSubmit} className="p-1 bg-red-800 rounded-2xl text-white w-1/5 text-md">Save</button>
                            </div>
                        </div>
                    ): (
                        // TODO make dynamic
                        <div className="my-3">
                            <div className="p-4">
                                <p id="child-modal-description" className="p-2">
                                    Status: {equipment.status}  
                                </p>
                                <p id="child-modal-description" className="p-2">
                                    Last Used: {equipment.updatedAt}
                                </p>
                                <p id="child-modal-description" className="p-2">
                                    Serial Number: {equipment.serialNo}
                                </p>
                                <p id="child-modal-description" className="p-2">
                                    Property Number: {equipment.inventoryNo}
                                </p>
                            </div>
                            <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                                <button onClick={handleClose} className="p-1 bg-white border-2 border-red-800 rounded-2xl text-red-800 w-1/5 text-md">Exit</button>
                                <button onClick={handleDeleteDialogState} className="p-1 bg-red-800 rounded-2xl text-white w-1/4 text-sm">Remove Device</button>
                                <button onClick={handleEditable} className="p-1 bg-red-800 rounded-2xl text-white w-1/5 text-md">Edit</button>
                                { deleteOpen && (
                                    <DeleteDialog openState={deleteOpen} handleDeleteDialogState={handleDeleteDialogState} />
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </Modal>
    </React.Fragment>
    );
}

export default DeviceInfo;
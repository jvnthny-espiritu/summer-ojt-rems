import React, {useState} from "react";
import {Modal} from '@mui/material';
import api from '../../services/api';

const AddDevice = ({handleOpenState, openState, equipmentType, rcId, handleCreation}) => {
    const [newStatus, setNewStatus] = useState("");
    const [newModel, setNewModel] = useState("");
    const [newSerialNo, setNewSerialNo] = useState("");
    const [newInventoryNo, setNewInventoryNo] = useState("");

    const [error, setError] = useState('');

    const handleCreationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/equipments', {
                type: equipmentType, 
                model: newModel, 
                serialNo: newSerialNo, 
                inventoryNo: newInventoryNo, 
                status: newStatus, 
                researchCenterId: rcId
            });
            setNewStatus("")
            handleCreation(response);
            handleOpenState()
            console.log('Response:', response.data);
        } catch (error) {
            setError("Creation failed. Check details.")
            console.error('Error:', error);
        }
    };

    return (
    <>
        <Modal
            open={openState}
            onClose={()=>handleOpenState()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            hideBackdrop = {true}
            className="flex flex-col justify-center items-center gap-3 font-base m-5"
            >
            <div className="flex flex-col border-2 border-black w-1/2 h-auto bg-white p-6 gap-3">
                <div className="my-6">
                    <h2 id="parent-modal-title" className="col-span-2 text-lg font-bold text-red-800">{"Add New > "+ equipmentType}</h2> 
                </div>
                <div className="mt-3">
                    <div>
                        <div className="flex flex-row gap-3 p-2">
                            <label htmlFor="status">Status</label>

                            <button 
                                onClick={() => setNewStatus("available")} 
                                className={`p-1 rounded-2xl w-1/5 text-sm ${newStatus === "available" ? "bg-green-800 text-white": "bg-white border-2 border-green-800 text-green-800"}`}>Available
                            </button>

                            <button 
                                onClick={() => setNewStatus("for repair")} 
                                className={`p-1 rounded-2xl w-1/4 text-sm ${newStatus === "for repair" ? "bg-red-800 text-white": "bg-zinc-200 border-2 border-red-800 text-red-800"}`}>For Repair
                            </button>

                            <button 
                                onClick={() => setNewStatus("work-in-progress")} 
                                className={`p-1 rounded-2xl w-1/5 text-sm ${newStatus === "work-in-progress" ? "bg-orange-600 text-white": "bg-zinc-200 border-2 border-orange-600 text-orange-600"}`}>Work In Progress
                            </button>
                        </div>
                        <div className="flex flex-row gap-3 p-2">
                            <label htmlFor="model">Model</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                type="model"
                                id="model"
                                value={newModel}
                                onChange={(e) => setNewModel(e.target.value)}
                                placeholder="Ultimaker"
                            />
                        </div>
                        <div className="flex flex-row gap-3 p-2">
                            <label htmlFor="serialNo">Serial Number</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                type="serialNo"
                                id="serialNo"
                                value={newSerialNo}
                                onChange={(e) => setNewSerialNo(e.target.value)}
                                placeholder="###"
                            />
                        </div>
                        <div className="flex flex-row gap-3 p-2">
                            <label htmlFor="inventoryNo">Inventory Number</label>
                            <input className="border-2 border-zinc-600 opacity-35 hover:border-black rounded-lg my-2 ml-3 p-2 w-2/3"
                                type="inventoryNo"
                                id="inventoryNo"
                                value={newInventoryNo}
                                onChange={(e) => setNewInventoryNo(e.target.value)}
                                placeholder="###"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row-reverse gap-4 mt-5 mb-1">
                        <button onClick={()=> {handleOpenState(!openState); setNewStatus("")}} className="p-1 bg-white border-2 border-red-800 rounded-2xl text-red-800 w-1/5 text-md">Cancel</button>
                        <button onClick={handleCreationSubmit} className="p-1 bg-red-800 rounded-2xl text-white w-1/5 text-md">Save</button>
                    </div>
                </div>
            </div>
        </Modal>
    </>
    );
}

export default AddDevice;
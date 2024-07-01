import React from "react";
import {Modal} from '@mui/material';

const PublicDeviceView = ({openState,handleClose, equipment}) => {
    return (
    <>
        <Modal
            open={openState}
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
                    </div>
                </div>
            </div>
        </Modal>
    </>
    );
}

export default PublicDeviceView;
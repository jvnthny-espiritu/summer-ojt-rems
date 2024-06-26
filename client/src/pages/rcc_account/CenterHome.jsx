import React, { useState } from 'react';
import DeviceInfo from "./DeviceInfo";

import { Link, useParams } from "react-router-dom"

import Button from '@mui/material/Button';

const AdminHome = () => {
	return (
		<div class = "w-full">
			<div>
				<p>Welcome {"Admin"}</p>
			</div>

			<div>
			</div>
		</div>
	);
};

const UserHome = () => {
	const [open, setOpen] = useState(false);
	const [currentDevice, setCurrentDevice] = useState(null);

	const handleOpen = (device) => {
		setCurrentDevice(device);
		setOpen(true);
	};

	const handleClose = () => {
		setCurrentDevice(null);
		setOpen(false);
	};

	const openState = open

	const devices = [
		{id:1, type:"3D Printer", name:"Ultimaker1"},
		{id:2, type:"3D Printer", name:"Ultimaker2"},
		{id:3, type:"3D Printer", name:"Ultimaker3"},
		{id:4, type:"CNC Machine", name:"CNC_1"},
		{id:5, type:"CNC Machine", name:"CNC_2"},
		{id:6, type:"Laser Cut", name:"Laser_1"},
		{id:7, type:"Laser Cut", name:"Laser_2"},
	]

	const deviceTypes = devices.reduce((current, device) => {
		if (!current[device.type]) {
			current[device.type] = [];
		}

		current[device.type].push(device);

		return current;
	}, {});

	const { center } = useParams()

	return(
		// TODO make dynamic
		<div className= "w-full">

			<div className="flex flex-col items-center bg-zinc-400 p-6">
				<p>Welcome { center }</p>
			</div>
			<div className="flex flex-col p-6">
				{Object.keys(deviceTypes).map((type) => (
					<div key={type}>
						<h3 className="text-lg mt-8 font-bold">{type}</h3>

						<ul className="w-2/5 place-content-center">
							{deviceTypes[type].map((device) => (
								<li key={device.id}>
									<div className="w-1.8/2 text-md mt-2 grid grid-cols-3">
										<p className="p-1 mr-7 ml-5 col-span-2">
											{device.name}
										</p>

										{/* Change to links later */}

										<Button className="p-1 bg-black rounded-md text-white w-1/3 text-sm hover:bg-blue-950" onClick={() => handleOpen(device)}>View</Button>

										{currentDevice && (
											<DeviceInfo open={openState} handleClose={handleClose} device={currentDevice ? currentDevice : ""}/>
										)}
									</div>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
};

const StaffHome = () => {
	let content;
	// change later when login logic is complete
	if(false){
		content = <AdminHome />
	}else {
		content = <UserHome />
	}
	return (
		<div>
			{content}
		</div>
	)
}

export default StaffHome;
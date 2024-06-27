import React, { useState, useEffect } from 'react';
import DeviceInfo from "./DeviceInfo";
import api from '../../services/api';
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
	const openState = open
	const [currentEquipment, setCurrentEquipment] = useState(null);

	// const [equipmentInfo, setEquipmentInfo] = useState(null);

	const [error, setError] = useState('');
    const [equipmentList, setEquipmentList] = useState([]);

	const handleOpen = (equipment) => {
		setCurrentEquipment(equipment);
		setOpen(true);
	};

	const handleClose = () => {
		fetchData();
		setCurrentEquipment(null);
		setOpen(false);
	};

	const fetchData = async (e) =>{
		// TODO CHANGE LATER TO ONLY GET EQUIPMENT THAT BELONGS TO SPECIFIC USER
        try {
            const response = await api.get('api/equipments');
            setEquipmentList(response.data)
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

	const equipmentTypes = equipmentList.reduce((current, equipment) => {
		if (!current[equipment.type]) {
			current[equipment.type] = [];
		}

		current[equipment.type].push(equipment);

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
				{Object.keys(equipmentTypes).map((type) => (
					<div key={type}>
						<h3 className="text-lg mt-8 font-bold">{type}</h3>

						<ul className="w-2/5 place-content-center">
							{equipmentTypes[type].map((equipment) => (
								<li key={equipment.id}>
									<div className="w-1.8/2 text-md mt-2 grid grid-cols-3">
										<p className="p-1 mr-7 ml-5 col-span-2">
											{equipment.model}
										</p>

										{/* Change to links later */}

										<Button className="p-1 bg-black rounded-md text-white w-1/3 text-sm hover:bg-blue-950" onClick={() => handleOpen(equipment)}>View</Button>

										{currentEquipment && (
											<DeviceInfo open={openState} handleClose={handleClose} equipment={currentEquipment ? currentEquipment : ""}/>
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
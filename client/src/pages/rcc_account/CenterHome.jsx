import React, { useState, useEffect } from 'react';
import DeviceInfo from "./DeviceInfo";
import AdminHome from "../admin_home/AdminHome";
import api from '../../services/api';
import { useParams, useLoaderData } from "react-router-dom"

import Button from '@mui/material/Button';

const UserHome = () => {
	const [open, setOpen] = useState(false);
	const openState = open
	const [currentEquipment, setCurrentEquipment] = useState(null);

	const [error, setError] = useState('');
	let [typesList, setTypesList] = useState([]);
    const [equipmentList, setEquipmentList] = useState({});

	const handleOpen = (equipment) => {
		setCurrentEquipment(equipment);
		setOpen(true);
	};

	const handleClose = () => {
		setCurrentEquipment(null);
		setOpen(false);
	};
	// TODO add id into params later
	const fetchTypes = async (e) => {
		try {
			const id= "ff1b9322-2f04-4679-9497-f356a158cbb1"
            const response = await api.get(`api/research-centers/${id}/equipments`);
			setTypesList(response.data)
			
        } catch (error) {
            setError('Fetching failed');
            console.error('Error:', error);
        }
	}

	// TODO reduce code
	const equipmentTypes = typesList.reduce((current, equipment) => {
		if (!current[equipment.type]) {
			current[equipment.type] = [];
		}

		current[equipment.type].push(equipment);

		return current;
	}, {});
	
	//TODO add id into params later
	const fetchEquipmentList = async (type,pageId,e) =>{
        try {
			const id= "ff1b9322-2f04-4679-9497-f356a158cbb1"
			const response = await api.get(`api/research-centers/${id}/equipments?type=${type}&page=${pageId}&limit=5`);
            //const response = await api.get(`api/equipments/specific?type=${type}&page=${pageId}&limit=5`);
            return response.data
        } catch (error) {
            setError('Fail');
            console.error('Error:', error);
        }
    }

    useEffect(() => {
		fetchTypes();
	}, []);
	
	useEffect(() => {
		// TODO reduce code
		const types = typesList.reduce((current, equipment) => {
			if (!current[equipment.type]) {
				current[equipment.type] = [];
			}
	
			current[equipment.type].push(equipment);
	
			return current;
		}, {});
		const tempList = Object.keys(types)
		const fetchData = async () => {
			const data = {};
			const pages = {}
			const items = {}
			for (let type of tempList) {
				data[type] = await fetchEquipmentList(type, 1);
				items[type] = data[type].sentEquipment
				pages[type] = data[type].totalPages
			}
				setTotalPages(pages)
				setEquipmentList(items);
		};
	
		if (tempList.length > 0) {
		    fetchData();
		}
	}, [typesList]);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handlePageChange = async (type,page) => {
		const pageEquipmentList = await fetchEquipmentList(type,page)
		setEquipmentList((prev) => ({
			...prev,
			[type]: pageEquipmentList.sentEquipment,
		}));
		setCurrentPage((prev) => ({
			...prev,
			[type]: page,
		}));
		setTotalPages((prev) => ({
			...prev,
			[type]: pageEquipmentList.totalPages,
		}));
	};

	const Pagination = ({ currentPage, totalPages, onPageChange, type }) => {
		const pageNumbers = [];
	
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
	
		return (
			<div className="pagination flex flex-row gap-6 justify-between">
				{pageNumbers.map((number) => (
					<button
					key={number}
					onClick={() => onPageChange(type,number)}
					className={number === currentPage ? 'active' : ''}
					>
					{number}
				</button>
				))}
			</div>
		);
	};

	// const { researchcenterid } = useParams();
	const data = useLoaderData();

	return(
		// TODO make dynamic
		<div className= "w-full">
			<div className="flex flex-col items-center bg-zinc-400 p-6">
				<p>Welcome { data }</p>
			</div>
			<div className="flex flex-col p-6">
				{Object.keys(equipmentTypes).map((item,i) => (
					<div key={i}>
						<h3 className="text-lg mt-8 font-bold">{item}</h3>
						<ul className="w-2/5 place-content-center">
							{equipmentList[item] && equipmentList[item].map((equipment) => (
							<li key={equipment.id}>
								<div className="w-1.8/2 text-md mt-2 grid grid-cols-3">
									<p className="p-1 mr-7 ml-5 col-span-2">
										{equipment.model}
									</p>
									<Button className="p-1 bg-black rounded-md text-white w-1/3 text-sm hover:bg-blue-950" onClick={() => handleOpen(equipment)}>View</Button>
									{currentEquipment && (
										<DeviceInfo open={openState} handleClose={handleClose} equipment={currentEquipment ? currentEquipment : ""}/>
									)}
								</div>
							</li>
							))}
						</ul>
						<div className="flex flex-row">
							<Pagination
									currentPage={currentPage}
									totalPages={totalPages[item]}
									onPageChange={handlePageChange}
									type={item}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
};

const StaffHome = () => {
	let content;
	// change later when login logic is complete
	if (false) {
		content = <AdminHome />
	} else {
		content = <UserHome />
	}

	return (
		<>
			{content}
		</>
	)
}

export default StaffHome;
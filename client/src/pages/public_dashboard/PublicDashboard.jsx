import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLoaderData } from "react-router-dom"
import PublicDeviceView from './PublicDeviceView';

const Pagination = ({ currentPage, totalPages, onPageChange, type, userId }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination flex flex-row gap-10 ml-6">
			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => onPageChange(userId,type,number)}
					className={`border-2 rounded-full px-2 py-1 text-sm border-black bg-zinc-300 opacity-75 ${number === currentPage ? 'active' : ''}`}
				>
				{number}
				</button>
			))}
		</div>
	);
};

const PublicDashboard = () => {
	const classNames = require('classnames')
	
	const userId = useLoaderData();
	const [openState, setOpenState] = useState(false);

	const [error, setError] = useState('');
    const [currentEquipment, setCurrentEquipment] = useState(null);
	let [typesList, setTypesList] = useState([]);
    const [equipmentList, setEquipmentList] = useState({});

	const handleOpen = (equipment) => {
		setCurrentEquipment(equipment);
		setOpenState(true);
	};

	const handleClose = () => {
		setCurrentEquipment(null);
		setOpenState(false);
	};
	
	const fetchTypes = async (id,e) => {
		try {
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
	
	const fetchEquipmentList = async (userId,type,pageId,e) =>{
        try {
			const response = await api.get(`api/research-centers/${userId}/equipments?type=${type}&page=${pageId}&limit=5`);
            return response.data
        } catch (error) {
            setError('Fail');
            console.error('Error:', error);
        }
    }

    useEffect(() => {
		fetchTypes(userId);
	}, [userId]);
	
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
				data[type] = await fetchEquipmentList(userId,type, 1);
				items[type] = data[type].sentEquipment
				pages[type] = data[type].totalPages
			}
				setTotalPages(pages)
				setEquipmentList(items);
		};
	
		if (tempList.length > 0) {
			fetchData();
		}
	}, [typesList,userId]);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handlePageChange = async (userId,type,page) => {
		const pageEquipmentList = await fetchEquipmentList(userId,type,page)
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

	return(
		<div className= "flex flex-col min-w-screen min-h-screen">
			<div className="flex flex-col bg-red-800 p-10">
				<p className="text-white text-2xl">STEERHub REM {"> " + userId}</p>
			</div>
			<div className="flex flex-col p-6">
				{/*Should be a Component*/}
				<div className="flex flex-col md:flex-row gap-5 md:gap-20 place-content-center text-lg">
					<div className="text-center">
						<p>Humidity</p>
						<p>42°</p>
					</div>
					<div className="text-center">
						<p>Temperature</p>
						<p>42°</p>
					</div>
					<div className="text-center">
						<p>Rating</p>
						<p>42°</p>
					</div>
				</div>

				{Object.keys(equipmentTypes).map((item) => (
					<div key={item}>
						<h3 className="text-lg mt-8 font-bold">{item}</h3>
						<div className="flex p-6">
							<ul className="flex flex-col gap-5 w-full justify-between md:flex-row">
								{equipmentList[item] && equipmentList[item].map((equipment) => (
									<li key={equipment.id}>
										<button 
											className={classNames(
												"flex p-1 rounded-md text-white text-lg",{
													"bg-green-800": equipment.status==="available",
													"bg-red-800": equipment.status==="for repair",
													"bg-orange-600": equipment.status==="work-in-progress"
												} 
											)}
											onClick={() => handleOpen(equipment)}>{equipment.model}</button>
										{currentEquipment && (
											<PublicDeviceView 
												openState={openState} 
												handleClose={handleClose} 
												equipment={currentEquipment ? currentEquipment : ""}/>
										)}
									</li>
								))}
							</ul>
						</div>
						<div className="flex flex-row">
							<Pagination
									currentPage={currentPage}
									totalPages={totalPages[item]}
									onPageChange={handlePageChange}
									type={item}
									userId={userId}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
};

export default PublicDashboard;
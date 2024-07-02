import React, {useEffect, useState} from 'react';
import DeviceInfo from "./DeviceInfo";
import AddDevice from "./AddDevice";
import api from '../../services/api';
import {useLoaderData} from "react-router-dom"
import {jwtDecode} from 'jwt-decode';

const Pagination = ({ currentPage, totalPages, onPageChange, type, userId }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination flex flex-row gap-3 ml-6">
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

const StaffHome = () => {
	const classNames = require('classnames')

	const userId = useLoaderData();
	const token = localStorage.getItem('token')
	const decodedToken = jwtDecode(token)
	const [open, setOpen] = useState(false);
	const openState = open
	const [currentEquipment, setCurrentEquipment] = useState(null);

	const [error, setError] = useState('');
	let [typesList, setTypesList] = useState([]);
  const [equipmentList, setEquipmentList] = useState({});
	const [refreshState, setRefreshState] = useState(false);
	const [newDeviceOpenState, setNewDeviceOpenState] = useState({});


	const toggleCreationModal = (item) => {
		setNewDeviceOpenState(prevState => ({
			...prevState,
			[item]: !prevState[item]
		}));
	};

	const handleCreation = (item) => {
		setRefreshState(true)
		setNewDeviceOpenState(prevState => ({
			...prevState,
			[item]: false
		}));
	};

	const handleOpen = (equipment) => {
		setCurrentEquipment(equipment);
		setOpen(true);
	};

	const handleClose = () => {
		setCurrentEquipment(null);
		setOpen(false);
	};

	const handleChangesAfterClose = () => {
		setRefreshState(true)
		setCurrentEquipment(null);
		setOpen(false);
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

		if(refreshState){
			fetchData();
			setRefreshState(false);
		}
	}, [typesList,userId, refreshState]);

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

	// const { researchcenterid } = useParams(); // TO BE CHANGE TO LOADERS SINCE ROUTING IS USING ID

	return(
		// TODO make dynamic
		<div className= "flex flex-col min-w-screen min-h-screen font-base">
			<div className="flex flex-col bg-red-800 p-10">
				<p className="text-white text-4xl text-justify">
					{`STEERHub REM: ${decodedToken.name}`}
				</p>
				{/* <p className="text-white text-md">{decodedToken.code}</p> */}
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

				<div className="flex flex-col gap-5">
					{Object.keys(equipmentTypes).map((item) => (
						<div key={item}>
							<div className="flex gap-3 p-5 justify-between">
								<div className="self-center text-3xl font-bold">
									{item}
								</div>
								<div className="self-center text-center">
									<button
										className="flex py-1 px-3 rounded-md text-white text-lg bg-black"
										onClick={() => toggleCreationModal(item)}
									>
										ADD Equipment
									</button>
									<AddDevice
										handleOpenState = {() => toggleCreationModal(item)}
										openState ={newDeviceOpenState[item] || false}
										equipmentType = {item}
										rcId = {userId}
										handleCreation = {handleCreation}
									/>
								</div>
							</div>

							<div className="p-6">
								<ul className="flex flex-col md:flex-row gap-5 w-full justify-evenly">
									{equipmentList[item] && equipmentList[item].map((equipment) => (
										<li key={equipment.id}>
											<button
												className={classNames(
													"p-1 rounded-md text-white text-lg",
													{
														"bg-green-800": equipment.status==="available",
														"bg-red-800": equipment.status==="for repair",
														"bg-orange-600": equipment.status==="work-in-progress"
													}
												)}
												onClick={() => handleOpen(equipment)}
											>
												{equipment.model}
												<hr />
												{equipment.status}
											</button>

											{currentEquipment && (
												<DeviceInfo
													open={openState}
													handleClose={handleClose}
													equipment={currentEquipment ? currentEquipment : ""}
													handleChangesAfterClose={handleChangesAfterClose}
												/>
											)}
										</li>
									))}
								</ul>
							</div>
							<div className="flex flex-row justify-end">
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
		</div>
	)
};

export default StaffHome;
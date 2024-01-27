import React, { useEffect, useState } from 'react'
import "../styles/getUsers.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

import { Oval } from 'react-loader-spinner';


const GetUsers = () => {
	const [users, setUsers] = useState([]);
	const [isEmpty,setIsEmpty] = useState(false);
	const [flag,setFlag] = useState(true);


	useEffect(() => {
		setFlag(true);
		async function getData() {
			try{
				const resp = await axios.get("https://mern-crud-backend-ep14.onrender.com/getall")
				// console.log(resp.data);
				setUsers(resp.data);
				setFlag(false);
			}
			catch(err){
				// console.log(err.response);
				setIsEmpty(true);
				setFlag(false);
				toast.error(err.response.data.msg);
			}
		}

		getData();
	}, []);



	async function handleDelete(userId){
		const flag = confirm("The entery will be deleted from database permanently. \nAre you sure to continue?");
		// console.log(flag);

		if(flag){

			async function deleting(){
				try{
					const resp = await axios.delete(`https://mern-crud-backend-ep14.onrender.com/deleteone/${userId}`);
					toast.success(resp.data.msg);

					window.location.reload();
				}
				catch(err){
					toast.error(err.response.data.msg);
				}
			}

			deleting();

		}
	}


	return (
		<>
			{
				flag?
				
				<div className="oval">
					<h1>Fetching Data</h1>
					<Oval width={60} color="#0a4a0f"/>
				</div>:
				

				<div className="main-container">
					<NavLink to={"/create"} className="add-btn">Add user</NavLink>

					{
						isEmpty?
						(
							<h1 className='not-found-header'>User Data not found</h1>
						):
						


						(
							<table border={2}>
								<thead>
									<tr>
										<th>S.No</th>
										<th>Name</th>
										<th>Email</th>
										<th>Action</th>
									</tr>
								</thead>

								<tbody>

									{
										users.map((element, index) => {
											return (
												<tr key={index}>
													<td>{index+1}</td>
													<td>{element.firstName} {element.lastName}</td>
													<td>{element.email}</td>
													<td className='action-btns'>
														<button className='btn-1' onClick={()=>handleDelete(element._id)}><DeleteIcon fontSize="inherit" /></button>
														<button className='btn-2'><NavLink to={`/updateone/${element._id}`}><EditIcon fontSize="inherit" /></NavLink></button>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						)

					}
					
					
				</div>

			}


		</>
	)
}

export default GetUsers
import React, { useState } from 'react'
import "../styles/addUser.css"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const [user,setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	})

	function inputHandler(event){
		// console.log(event.target);
		const name = event.target.name;
		const value = event.target.value;

		setUser({...user, [name]:value});
		// console.log(user);
	}


	function clearingFields(){
		setUser({
			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		})
	}

	async function submitHander(event){
		event.preventDefault()

		try{
			const resp = await axios.post("https://mern-crud-backend-ep14.onrender.com/createone", user)
			// console.log(resp);
			clearingFields()
			toast.success("Successfully Created", {position: "top-right"})
		}
		catch(err){
			// console.log(err.response);
			toast.error(err.response.data.msg, {position: "top-right"})
		}
		
	}


  return (
    <div className="add-user-container">
        <NavLink to={"/"}>Back</NavLink>
        <h3>Create New User</h3>
        <form className='add-user-form' onSubmit={submitHander} autoComplete='off'>
            <div className="input-group">
                <label htmlFor="fName">First Name</label>
                <input type="text" name="firstName" id="fName" onChange={inputHandler} autoComplete='off' placeholder='Enter First Name' required value={user.firstName}/>
            </div>
            <div className="input-group">
                <label htmlFor="lName">Last Name</label>
                <input type="text" name="lastName" id="lName" onChange={inputHandler} autoComplete='off' placeholder='Enter Last Name' required value={user.lastName}/>
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={inputHandler} autoComplete='off' placeholder='Enter Email' required value={user.email}/>
            </div>
            <div className="input-group">
                <label htmlFor="mobile">Mobile</label>
                <input type="number" name="phone" id="mobile" onChange={inputHandler} autoComplete='off' placeholder='Enter Mobile' required value={user.phone}/>
            </div>

            <div className="input-group">
                <button type="submit">ADD USER</button>
            </div>
        </form>

    </div>
  )
}

export default AddUser
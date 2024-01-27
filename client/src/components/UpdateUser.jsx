import React, { useEffect, useState } from 'react'
import "../styles/addUser.css"
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = () => {
  const {id} = useParams();
  const [user,setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  function handleInput(event){
    const name = event.target.name;
    const value = event.target.value;
    setUser({...user, [name]:value});
  }

  async function handleSubmit(event){
    event.preventDefault();

    try{
      const resp = await axios.put(`http://localhost:8000/updateone/${id}`, user);
      // console.log(resp);
      toast.success(resp.data.msg);
    }
    catch(err){
      toast.error(err.response.data.msg);
    }
  }

  useEffect(()=>{
    async function getData(){
      try{
        const resp = await axios.get(`http://localhost:8000/getone/${id}`);
        // console.log(resp.data);
        setUser(resp.data);
      }
      catch(err){
        // console.log(err.response.data.msg);
        toast.error("Uncaught Error (manually thrown)");
      }
    }

    getData();
  },[])

  return (
    <div className="add-user-container">
      <NavLink to={"/"}>Back</NavLink>
      <h3>Update User</h3>
      <form className='add-user-form' onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="fName">First Name</label>
          <input type="text" name="firstName" id="fName" autoComplete='off' placeholder='Enter First Name' onChange={handleInput} value={user.firstName}/>
        </div>
        <div className="input-group">
          <label htmlFor="lName">Last Name</label>
          <input type="text" name="lastName" id="lName" autoComplete='off' placeholder='Enter Last Name' onChange={handleInput} value={user.lastName}/>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" autoComplete='off' placeholder='Enter Email' onChange={handleInput} value={user.email}/>
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="number" name="phone" id="mobile" autoComplete='off' placeholder='Enter Mobile' onChange={handleInput} value={user.phone}/>
        </div>

        <div className="input-group">
          <button type="submit">UPDATE</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser
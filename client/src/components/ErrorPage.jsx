import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/errorPage.css"
import SadFace from "../assets/sadness.png"
import { ThreeDots } from 'react-loader-spinner'

const ErrorPage = () => {
  const navigate = useNavigate();

	useEffect(()=>{
		setTimeout(() => {
			navigate("/");
		}, 3000);
	},[])

  return (
		<>
			<div className="error-container">
				<img src={SadFace} height={120} width={150} />
				<h1>404 <br />Page not found</h1>
				<div>
					The page you are looking for doesn't exists <br />
					Redirecting to home page....
					<ThreeDots/>
				</div>
			</div>
		</>

  )
}

export default ErrorPage
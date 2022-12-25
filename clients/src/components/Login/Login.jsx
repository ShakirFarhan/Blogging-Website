import React from 'react'
import './Login.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../apis/users'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import axios, { Axios } from 'axios'
const defaultData = {
  email: "",
  password: ""
}
function Login() {
  const pageRoute = useNavigate()
  const [response, setResponse] = useState("")
  const [errorExist, setErrorExits] = useState(false)
  const [spinner, setSpiner] = useState(false)
  const password = () => {
    if (showPass == true) {
      setShowPass(false)
    }
    else {
      setShowPass(true)
    }
  }
  //  
  const [showPass, setShowPass] = useState(false)
  const [userData, setUserData] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const change = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const submit = async () => {
    setLoading(true)
    const res = await loginUser(userData)
    setLoading(false)
    if (res.data.error) {
      setErrorExits(true)
      setResponse(res.data.error)
      setUserData({ email: userData.email, password: "" })
    }
    else {
      if (res.data.status === 201) {
        localStorage.setItem("JWTFINALTOKEN", res.data.result.token)
        pageRoute('/')
      }
      setErrorExits(false)
    }
  }
  return (
    <>

      <div className='login-page' onClick={() => setErrorExits(false)}>
        <form className='container login-card'>
          <h2 className='welcome text-center'>Welcome Back</h2>
          <p className='text-center welcome-info mt-2'>Glad to see you😍 Please Login</p>
          <div className="mb-3">
            <label style={{ color: " rgba(34, 34, 34, 1)" }} htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={change} name='email' type="email" className="form-control loginInputs" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 password">
            <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
            <input onChange={change} value={userData.password} name='password' type={showPass ? "text" : "password"} className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" />
            <input className='mt-3 tick' type="checkbox" onClick={password} />Show Password
          </div>
          <div class="alert alert-danger" style={{ "display": errorExist ? "block" : "none" }} role="alert">
            {response}
          </div>
          <Link style={{ display: loading ? "none" : "" }} to="/login">
            <button onClick={submit} className="login-btn mt-3">Login</button>
          </Link>
          <div style={{ display: loading ? "" : "none" }}>
            <button className='login-btn register-btn mt-3'><div className='register-spinner'><lottie-player src="https://assets8.lottiefiles.com/packages/lf20_pwszksuv.json" className="text-center" background="transparent" speed="1" style={{ width: "50px", height: "40px" }} loop autoplay></lottie-player>
            </div></button>
          </div>
          {/* <button className='login-btn'>www</button> */}
          <p className='noaccount text-center mt-3'>Dont have an Account?<Link className='login' to='/register'> Register</Link></p>
        </form>
      </div>
    </>
  )
}

export default Login
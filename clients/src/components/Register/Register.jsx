import React from 'react'
import "./Register.css"
import { registerUser } from '../../apis/users';
import { Link, useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
const defaultValue = {
  username: "",
  email: "",
  password: "",
  confirmpassword: ""
}
function Register() {
  const [data, setData] = useState(defaultValue)
  const [showPass, setShowPass] = useState(false)
  const [showCpass, setShowCpass] = useState(false)
  const [errorExist, setErrorExits] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [clientsRespone, setclientsRespone] = useState(false)

  const pageRoute = useNavigate()
  const changeValue = (e) => {
    console.log(data)
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }
  const password = () => {
    if (showPass == true) {
      setShowPass(false)
    }
    else {
      setShowPass(true)
    }
  }
  const cpassword = () => {
    if (showCpass == true) {
      setShowCpass(false)
    }
    else {
      setShowCpass(true)
    }
  }
  const submit = async () => {
    setData(defaultValue)
    setLoading(true)
    const res = await registerUser(data)
    setLoading(false)
    if (res.data.error) {
      setErrorExits(true)
      setResponse(res.data.error)
    }
    else if (res.data.message === "Registered") {
      pageRoute('/login')
    }
  }
  const registerpageClick = () => {
    setErrorExits(false)

  }
  return (
    <>

      <div className='register-page' style={{ "transition": "0.6s", display: loading ? "none" : "block" }} onClick={registerpageClick}>

        <form className='container register-card' method='post'>
          <h2 className='welcome text-center'>Sign Up</h2>
          <p className='text-center welcome-info mt-2'>You will undoubtedly have a good time here.</p>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input onChange={changeValue} name='username' type="text" className="form-control registerInput" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.username} required />
            {/* <div id="usernameHelp" className="form-text errorText">{usernameRes}</div> */}

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={changeValue} name='email' type="email" className="form-control registerInput" id="exampleInputEmail1" aria-describedby="emailHelp" value={data.email} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>


          </div>
          <div className="mb-3 password">
            <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
            <input onChange={changeValue} value={data.password} name='password' type={showPass ? "text" : "password"} className="form-control registerInput" id="exampleInputPassword" required />
            {/* <input className='mt-3 tick rTick' type="checkbox" onClick={password} /><span className='rText'>Show Password</span> */}
            {/* <div id="usernameHelp" className="form-text errorText">{passwordRes}</div> */}

            <button onClick={password} type='button' className='pos text-center'>{showPass ? "Hide" : "Show"}</button>

          </div>
          <div className="mb-1 password">
            <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label>
            <input onChange={changeValue} value={data.confirmpassword} name='confirmpassword' type={showCpass ? "text" : "password"} className="form-control registerInput" id="exampleInputPassword" required />
            {/* <input className='mt-3 tick rTick' type="checkbox" onClick={cpassword} /><span className='rText pb-5'>Show Password</span> */}
            <button type='button' onClick={cpassword} className='pos text-center'>{showCpass ? "Hide" : "Show"}</button>
          </div>
          <div class="alert alert-danger" style={{ display: errorExist ? "block" : "none" }} role="alert">
            {response || clientsRespone}
          </div>
          <Link style={{ display: loading ? "none" : "" }} to="/register">
            <button onClick={submit} className="login-btn ">Register</button>
          </Link>
          <div style={{ display: loading ? "" : "none" }}>
            <button className='login-btn register-btn'><div className='register-spinner'><lottie-player src="https://assets8.lottiefiles.com/packages/lf20_pwszksuv.json" className="text-center" background="transparent" speed="1" style={{ width: "50px", height: "40px" }} loop autoplay></lottie-player>
            </div></button>
          </div>
          <p className='noaccount text-center mt-3'>Already have an Account?<Link className='login' to='/login'> Login</Link></p>
        </form>
      </div>

    </>
  )
}

export default Register
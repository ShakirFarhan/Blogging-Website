import React, { useState } from 'react'
import "./editprofile.css"

import { updateUser, getUserById } from '../../apis/users'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import FileBase64 from 'react-file-base64';
import { useRef } from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../Navbar/Navbar'
import loadingAnimation from "../../assets/loading.gif"

const defaultData = {
  username: "",
  fullname: "",
  bio: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  profilePic: ""
}

function EditProfile() {
  const [data, setData] = useState(defaultData)
  const [usernameExist, setUsernameExits] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState("")
  const { id } = useParams()
  const pageRoute = useNavigate()
  const inputref = useRef(null)
  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const userUpdate = async () => {
    setLoading(true)
    const res = await updateUser(id, data)
    setLoading(false)
  }
  const getuser = async () => {
    setLoading(true)
    let res = await getUserById(id)
    setLoading(false)
    setUser(res.data.success)
    setData(res.data.success)
  }
  const fileOpen = () => {
    inputref.current.click()
  }
  const textarea = (e) => {
    console.log(e.key)
    let t = e.target.value
    let br = document.createElement('br')
    if (e.key === "Enter") {
      document.getElementById('textarea').value.replace("\n", "<br />");
    }
  }
  useEffect(() => {
    getuser()
  }, [])
  return (
    <>
      <Navbar />
      <div style={{ display: loading ? "block" : "none" }} className='loading-animation'>
        <div className='loading-div'>

          <img style={{ width: "200px", height: "200px" }} src={loadingAnimation} alt="" />

        </div>
      </div>
      <div style={{ display: loading ? "none" : "block" }} class="container-xl px-4  edit-container">
        <nav class="nav nav-borders">
          <a style={{ fontWeight: "600" }} class="nav-link ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
        </nav>
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div style={{ backgroundColor: "#313638", color: "white" }} class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <div className='profile-pic-div'>
                  <img style={{ objectFit: "cover" }} class="img-account-profile  mb-2" src={data.profilePic} alt="" />
                  <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                </div>
                <div className='upload-btn-div'>
                  <button style={{ backgroundColor: "#313638" }} class="btn btn-success" type="button"><div className='inputFile'>
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => setData({ ...data, profilePic: base64 })} ref={inputref} onClick={fileOpen} />
                  </div></button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div style={{ backgroundColor: "#313638", color: "white" }} class="card-header">Account Details</div>
              <div class="card-body">
                <form method="patch">
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">Username (How your name will appear to other users on the site)</label>
                    <input onChange={change} name='username' class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={data.username} />
                    <div className="form-text error-text">{usernameExist ? "Username Already Exists" : ""}</div>
                  </div>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">Full Name</label>
                    <input onChange={change} name='fullname' class="form-control" id="inputEmailAddress" type="text" placeholder="Enter your Full Name" value={data.fullname} />
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-12">
                      <label class="small mb-1" for="inputOrgName">Bio</label>
                      {/* <input onChange={change} name='bio' class="form-control" id="inputOrgName" type="text" placeholder="Describe About Yourself" value={data.bio} /> */}
                      <textarea id='textarea' onKeyPress={textarea} onChange={change} style={{ width: "100%", fontSize: "12px", border: "1px solid #dee2e8", borderRadius: "5px", padding: "10px" }} name='bio' rows="10" type="text" value={data.bio}></textarea>
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">Instagram URL</label>
                      <input onChange={change} name='instagram' class="form-control" id="inputFirstName" type="text" placeholder="Enter Instagram URL" value={data.instagram} />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">Twitter URL</label>
                      <input onChange={change} name='twitter' class="form-control" id="inputFirstName" type="text" placeholder="Enter Twiiter URL" value={data.twitter} />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">LinkedIn URL</label>
                      <input onChange={change} name='linkedin' class="form-control" id="inputPhone" type="url" placeholder="Enter LinkedIn URL" value={data.linkedin} />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">Facebook URL</label>
                      <input onChange={change} name='facebook' class="form-control" id="inputBirthday" type="url" placeholder="Enter Facebook URL" value={data.facebook} />
                    </div>
                  </div>
                  <a href={`/profile/${id}`}>
                    <button style={{ backgroundColor: "#313638", fontSize: "14px" }} onClick={userUpdate} class="btn btn-success" type="button">Save changes</button>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
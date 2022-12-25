import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import "./Write.css"
import 'react-quill/dist/quill.snow.css';
import Navbar from '../Navbar/Navbar';
import { LoginContext } from '../../contextProvider/Context';
import { useContext } from 'react';
import axios, { Axios } from 'axios';
import FileBase64 from 'react-file-base64';
import { useRef } from 'react'
import { postBlog } from '../../apis/Blogs';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// title:title,
// authorid:authorid,
// authorImage:author.profilePic,
// authorName:author.username,
// image:image,
// description:description,
// category:category,
// readtime:readtime,
// publishDate:date,
function Write() {
  const { loginData, setLoginData } = useContext(LoginContext)
  const data = {
    title: "",
    image: "",
    description: "",
    category: "",
    readtime: "",
  }
  // const inputref = useRef(null)

  const [desc, setDesc] = useState('');
  const [post, setPost] = useState(data)
  const [d, setD] = useState('')
  const [initial, setInitial] = useState("hello")

  // const imageRef = useRef(null)
  // const fileOpen = () => {
  //   imageRef.current.click()
  // }

  const change = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
    // console.log(post)
    // console.log(e.target.name, e.target.valye)
  }
  const body = { ...post, description: desc, authorid: loginData._id }
  const testdata = async () => {
    await postBlog(body)
  }
  const editorChange = (e) => {
    setDesc(e)
  }
  console.log(body)
  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <form>
          <input onChange={change} className='inputs' type="text" name="title" placeholder="Title" required />

          <button class="thumbnailbtn" type="button"><div className="thumbnaildiv">
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setPost({ ...post, image: base64 })} />
          </div></button>
          <small class="form-text text-muted thumbnailMessage mb-3">This is the first thing the readers will notice.</small>
          {/* <image src= alt="Thumbnail-photo" /> */}
          <small class="form-text text-muted thumbnailMessage mb-3">Tip to Write a good description: Always begin with a short intro, which can be more than 3-4 lines without text styling.</small>

          <ReactQuill
            id='editor'
            modules={Write.modules}
            theme="snow"
            value={desc}
            onChange={editorChange}
            placeholder="Start Writing From here"
            required
            style={{ marginTop: "-14px" }}
          />
          <div className='write-flex'>
            <div>

              <input onChange={change} className='readtimeInput' type="text" name="readtime" placeholder='Enter read time' required />
              <small class="form-text text-muted thumbnailMessage mb-3">Eg: 7 min</small>
            </div>
            <div>
              <input onChange={change} className='categoryInput' type="text" name="category" placeholder='Enter category' required />
              <small class="form-text text-muted thumbnailMessage mb-3">Eg: Technology</small>

            </div>

          </div>

          <button className='publish-btn mt-3' onClick={testdata}>Publish</button>


        </form>

      </div>
    </>
  )
}
Write.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image"],
    ["clean"],
  ],
}
export default Write
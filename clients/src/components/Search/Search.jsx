import React from 'react'
import { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import "./Search.css"
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Navbar from '../Navbar/Navbar';
import { searchAuthor, searchBlog, searchCategory } from '../../apis/Blogs';
import { useEffect } from 'react';
import Author from './Author';
import Category from './Category';
import Blog from './Blog';

const defaultValue = {
  Blog: "",
  Author: "",
  Category: ""
}
function Search(props) {
  // const [active, setActive] = useState(false)
  const [blogActive, setBlogActive] = useState(false)

  const [authorActive, setAuthorActive] = useState(false)
  const [categoryActive, setcategoryActive] = useState(false)
  const [blogQuery, setBlogQuery] = useState("")
  const [authorQuery, setAuthorQuery] = useState("")
  const [categoryQuery, setCategoryQuery] = useState("")


  const act = async (e) => {
    console.log(e.target.id)
    setBlogActive(true)
    if (e.target.id === "blogs") {
      setBlogActive(true)
      setAuthorActive(false)
      setcategoryActive(false)
    }
    else if (e.target.id === "authors") {
      setAuthorActive(true)
      setBlogActive(false)
      setcategoryActive(false)
    }
    else if (e.target.id === "category") {
      setAuthorActive(false)
      setBlogActive(false)
      setcategoryActive(true)
    }
  }
  // const change = (e) => {
  //   setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value })
  // }
  useEffect(() => {
    setBlogActive(true)
  }, [])
  return (
    <>
      <Navbar />
      <Stack style={{ display: "none" }} sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress style={{ width: "100%" }} color="success" />
      </Stack>
      <div className='container search-page'>
        <form method='get' style={{ display: categoryActive || authorActive ? "none" : "" }} className='search-bar'>
          <input onChange={(e) => setBlogQuery(e.target.value)} className='search-section' type="text" placeholder="Search Anything" name="Blog" />
          <button className='icon-btn' onClick={(e) => e.preventDefault()}><BiSearchAlt2 className='search-icon' /></button>
        </form>
        <form method='get' style={{ display: authorActive ? "" : "none" }} className='search-bar'>
          <input onChange={(e) => setAuthorQuery(e.target.value)} className='search-section' type="text" placeholder="Search Anything" name="Author" />
          <button className='icon-btn'><BiSearchAlt2 className='search-icon' /></button>
        </form>
        <form method='get' style={{ display: categoryActive ? "" : "none" }} className='search-bar'>
          <input onChange={(e) => setCategoryQuery(e.target.value)} className='search-section' type="text" placeholder="Search Anything" name="Category" />
          <button className='icon-btn' type='submit'><BiSearchAlt2 className='search-icon' /></button>
        </form>
        <div className='search-result'>
          <div className='search-query'>
            <button style={{ borderBottom: blogActive ? "2px solid rgba(0, 170, 161, 1)" : "none" }} id="blogs" onClick={act} className='blog-related-search'>Blogs</button>
            <button id="authors" style={{ borderBottom: authorActive ? "2px solid rgba(0, 170, 161, 1)" : "none" }} onClick={act} className='author-related-search'>Authors</button>
            <button id="category" style={{ borderBottom: categoryActive ? "2px solid rgba(0, 170, 161, 1)" : "none" }} onClick={act} className='category-related-search'>Category</button>
          </div>
          <div style={{ display: blogActive ? "block" : "none" }} className='blog-results'>

            <Blog search={blogQuery} />
          </div>
        </div>
        <div style={{ display: authorActive ? "block" : "none" }} className='author-results'>
          <Author search={authorQuery} />
        </div>
        <div style={{ display: categoryActive ? "block" : "none" }} className='category-results'>
          <Category search={categoryQuery} />
        </div>

      </div>
    </>
  )
}

export default Search
import React, { useState } from 'react'
import { useEffect } from 'react'
import { searchAuthor } from '../../apis/Blogs'

function Author(props) {
  const [author, setAuthor] = useState([])
  let search = props.search
  console.log(search)
  const searchForAuthor = async () => {
    const res = await searchAuthor(search)
    setAuthor(res.data)
    author.filter(e => e.username.toLowerCase().includes(search))
    console.log(author)

  }
  useEffect(() => {
    searchForAuthor()
  }, [search])
  return (
    <>

      <div className='noResults'>
        <p>Make sure all words are spelled correctly.<br />
          Try different keywords.<br />
          Try more general keywords.</p>
      </div>
      {
        author.map((e) => {
          return (
            <>
              <a href={`/profile/${e._id}`}>
                <div className='following-container mt-3'>

                  <div className='imageFlex'>
                    <img className='searchProfile' src={e.profilePic} />
                    <div className='fflex'>
                      <p className='searchUsername'>{e.username}</p>
                      <p className='searchFullname'>{e.fullname}</p>
                    </div>
                  </div>
                  <a href={`/profile/${e._id}`}>
                    <button className='searchBtn'>View</button>
                  </a>
                </div>
              </a>
            </>
          )
        })
      }
    </>
  )
}

export default Author
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { searchBlog } from '../../apis/Blogs'

function Blog(props) {
  let search = props.search
  let [blogs, setBlogs] = useState([])
  const searchForBlogs = async () => {
    const res = await searchBlog(search)
    console.log(res)
    setBlogs(res.data)
    blogs.filter(e => e.title.toLowerCase().includes(search))

  }
  useEffect(() => {
    searchForBlogs()
  }, [search])
  return (
    <>


      <div className='noResults'>
        <p>Make sure all words are spelled correctly.<br />
          Try different keywords.<br />
          Try more general keywords.</p>
      </div>

      {
        search && blogs.map((e) => {
          return (
            <>
              <a href={`/blog/${e._id}`} >
                <div className='blog-card mt-4'>
                  <img className='recent-blog-img' src={e.image} alt='' />
                  <div className='blogInfo'>
                    <span className='category'>{e.category}</span>
                    <h3 className='right-blog-title mt-2'>{e.title}</h3>
                    <div className='minor-info'>
                      <img className='author-image' src={e.authorImage} alt='' />
                      <span className='publishdate'>&nbsp;&nbsp;{e.authorName}</span>
                      &nbsp;
                      <div className='icons-flex'> &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>&nbsp;

                        <p className='publishdate'>{e.publishDate}</p></div>
                      &nbsp;
                      <div className='icons-flex'> &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                        &nbsp;

                        <p className='publishdate'>{e.readtime}</p></div>
                    </div>
                    <div className='intro right-intro' dangerouslySetInnerHTML={{ __html: e.description.slice(0, 150) }}>
                    </div>
                  </div>
                </div>
              </a>
            </>
          )
        })


      }
    </>
  )
}

export default Blog
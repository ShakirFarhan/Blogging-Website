import React, { useState } from 'react'
import "./Home.css"
import image from "../../assets/test.jpg"
import { categoryCount, getAllBlogs, getBlogById } from '../../apis/Blogs'
import { usersCount, blogsCount, getUserById, } from '../../apis/users'
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti"
import { AiOutlineInstagram } from "react-icons/ai"
import { useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { LoginContext } from '../../contextProvider/Context'
import { useNavigate } from 'react-router-dom'
import loadingAnimation from "../../assets/loading.gif"
import axios from "axios"
import Navbar from '../Navbar/Navbar'
const url = "http://localhost:8000"
export const user = []
function Blog(props) {
  const [blog1, setBlog1] = useState("")
  const [blog2, setBlog2] = useState("")
  const farhanBlog1 = async () => {
    const res = await getBlogById("63565ca0e7f50f49f39084a0")
    setBlog1(res.data.message)
  }
  const farhanBlog2 = async () => {
    const res = await getBlogById("635658fce7f50f49f3908420")
    setBlog2(res.data.message)
  }

  useState(() => {
    farhanBlog1()
    farhanBlog2()

  }, [])
  return (
    <>

      <div className='blog'>
        <a href={`/blog/${blog1._id}`}>
          <a href={`/tag/${blog1.category}`}>
            <span className='category'>{blog1.category}</span>
          </a>

          <h2 className='title mt-2 mb-4'>{blog1.title}</h2>
          <img className='blog-image' src={blog1.image} alt="" />
          {/* <div className='minor-info pt-2'>
            <a href={`/profile/${blog1.authorid}`}>

              <img className='author-image' src={blog1.authorImage} alt='' />
              &nbsp; <span className='featuredAuthorName'>{blog2.authorName}</span>&nbsp;
            </a>
            <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>&nbsp;

              <p className='publishdate'>{blog1.publishDate}</p></div>
            &nbsp;
            <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
              &nbsp;

              <p className='publishdate'> {blog1.readtime} </p></div>
          </div> */}
          <a style={{ textDecoration: "none" }} href={`/profile/${blog1.authorid}`}>
            <div className='minor-info mt-3'>
              <img className='author-image' src={blog1.authorImage} alt='' />
              <span className='publishdate'>&nbsp;&nbsp;{blog1.authorName}</span>
              &nbsp;
              <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>&nbsp;
                <p className='publishdate'>{blog1.publishDate}</p></div>
              &nbsp;
              <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                &nbsp;
                <p className='publishdate'>{blog1.readtime}</p></div>
            </div>
          </a>
          <div className='intro' dangerouslySetInnerHTML={{ __html: blog1.description?.slice(0, 150) }}>

          </div>
        </a>
      </div>


      <div className='blog'>
        <a href={`/tag/${blog2.category}`}>
          <span className='category'>{blog2.category}</span>

        </a>
        <a href={`/blog/${blog2._id}`}>


          <h2 className='title mt-2 mb-4'>{blog2.title}</h2>
          <img className='blog-image' src={blog2.image} alt="" />
          <a style={{ textDecoration: "none" }} href={`/profile/${blog2.authorid}`}>
            <div className='minor-info mt-3'>
              <img className='author-image' src={blog2.authorImage} alt='' />
              <span className='publishdate'>&nbsp;&nbsp;{blog2.authorName}</span>
              &nbsp;
              <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>&nbsp;
                <p className='publishdate'>{blog2.publishDate}</p></div>
              &nbsp;
              <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                &nbsp;
                <p className='publishdate'>{blog1.readtime}</p></div>
            </div>
          </a>

          <div className='intro' dangerouslySetInnerHTML={{ __html: blog2.description?.slice(0, 150) }}>

          </div>
        </a>

      </div>

    </>
  )
}
function ShortBlogs(props) {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    const res = await getAllBlogs()
    setBlogs(res.data)

  }
  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <>
      {
        blogs?.map((e, index) => {

          return (
            <>
              <a href={`/blog/${e._id}`}>


                <div className='short-blog mb-5'>
                  <a href={`/tag/${e.category}`}>

                    <span className='category'>{e.category}</span>
                  </a>
                  <h3 className='right-blog-title short-blog-title mt-3'>{e.title}</h3>
                  <div className='minor-info pt-2 mb-0'>
                    <img className='author-image' src={e.authorImage} alt='' />
                    &nbsp;
                    <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>&nbsp;

                      <p className='publishdate'>{e.publishDate}</p></div>
                    &nbsp;
                    <div className='icons-flex'>| &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 small-icons">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      &nbsp;

                      <p className='publishdate'> {e.readtime} </p></div>
                  </div>
                  <div className='intro right-intro' dangerouslySetInnerHTML={{ __html: e.description.slice(0, 130) }}>

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
function PopularAuthors(props) {
  const [farhanProf, setFarhanProf] = useState("")
  const farhan = async () => {
    const res = await getUserById("6356398360be867515164b63")
    setFarhanProf(res.data.success)
  }
  useEffect(() => {
    farhan()
  }, [])
  return (
    <>
      <a href={`/profile/${farhanProf._id}`}>
        <div className='profile mb-5'>
          <img className='top-author' src={farhanProf.profilePic} alt="" />
          <div className='author-info'>
            <h4 className='authorName'>{farhanProf.username}</h4>
            <h5 className='designation'>{farhanProf.bio?.slice(0, 60) + "..."}</h5>
            <div className='authorSocials'>
              <a href={farhanProf.facebook} target="_blanck">
                <TiSocialFacebook className='social-icons' />
              </a>
              <a href={farhanProf.linkedin} target="_blanck">
                <TiSocialLinkedin className='social-icons' />
              </a>
              <a href={farhanProf.twitter} target="_blanck">
                <TiSocialTwitter className='social-icons' />

              </a>
              <a href={farhanProf.instagram} target="_blanck">
                <AiOutlineInstagram className='social-icons' />
              </a>
            </div>
          </div>
        </div>
      </a>
    </>
  )

}
export function RightSection() {
  const [totalUsers, setTotalUsers] = useState("")
  const [totalBlogs, setTotalBlogs] = useState("")
  const [catCount, setCatCount] = useState(0)
  const userCount = async () => {
    let res = await usersCount()
    setTotalUsers(res.data.count)
  }
  const blogCount = async () => {
    let res = await blogsCount()
    setTotalBlogs(res.data.count)
  }
  const categoriesCount = async () => {
    const res = await categoryCount()
    setCatCount(res.data)
  }
  useEffect(() => {
    userCount()
    blogCount()
    categoriesCount()
  }, [])
  return (
    <>
      <div className='sec-2-right'>
        <h3 className='featured mb-5'><span className='backgroundColor'>&nbsp;Top &nbsp;</span>&nbsp;Author</h3>
        <PopularAuthors />
        <PopularAuthors />
        <PopularAuthors />

        <div className='ad text-center center'>
          <p className='ad-title'>Ad</p>
          <div className='for-add'>
            <h6 className='adTitle'>
              Want To Collaborate Or Suggest Something?
            </h6>
            <p className='adDescription'>
              If someone discovers any bugs or technical concerns, please notify me.
            </p>
            <a href={`/profile/6356398360be867515164b63`}>
              <button className='adBtn'>
                Connect
              </button>
            </a>
          </div>
        </div>


        <div className='categories-section'>
          <h3 className='featured mt-5'><span className='backgroundColor'>&nbsp;Categories&nbsp;</span></h3>
          <table className="table table-borderless mt-4">

            <tbody>
              <tr className='border mb-5' onClick={() => console.log("hello")}>
                <th scope="row categorie-title">Technology</th>
                <td className='text-right categorie-result'>{catCount.technology}</td>
              </tr>

              <tr className='border'>
                <th scope="row categorie-title">Fashion</th>
                <td className='text-right categorie-result'>{catCount.fashion}</td>
              </tr>
              <tr className='border'>
                <th scope="row categorie-title">Javascript</th>
                <td className='text-right categorie-result'>{catCount.javascript}</td>
              </tr>
              <tr className='border'>
                <th scope="row categorie-title">Business</th>
                <td className='text-right categorie-result'>{catCount.business}</td>
              </tr>

            </tbody>
          </table>
        </div>
        <div className='sticky-section'>
          <h3 className='featured mt-5 mb-5'><span className='backgroundColor'>&nbsp;Website&nbsp;</span>&nbsp;Update</h3>

          <div className='update-section'>
            <div className='updates-card'>
              <h4 className='updates-no'>{totalBlogs}</h4>
              <p className='updates-des'>Posts</p>
            </div>
            <div className='updates-card card-2'>
              <h4 className='updates-no'>255</h4>
              <p className='updates-des'>Visitors</p>
            </div>
            <div className='updates-card'>
              <h4 className='updates-no'>{totalUsers}</h4>
              <p className='updates-des'>Users</p>
            </div>
            <div className='updates-card'>
              <h4 className='updates-no'>{totalBlogs * (totalUsers - 1)}</h4>
              <p className='updates-des'>Blog Read</p>
            </div>

          </div>
          <div className='search-with-tags'>
            <h3 className='featured mt-5'><span className='backgroundColor'>&nbsp;Popular&nbsp;</span>&nbsp;categories</h3>
            <div className='all-tags  mt-4'>
              <a href={`/tag/Travel`}>
                <button className='tag'>
                  Travel
                </button>
              </a>
              <a href={`/tag/Lifestyle`}>
                <button className='tag'>
                  Lifestyle
                </button>
              </a>
              <a href={`/tag/Fashion`}>
                <button className='tag'>
                  Fashion
                </button>
              </a>
              <a href={`/tag/Technology`}>
                <button className='tag'>
                  Technology
                </button>
              </a>
              <a href={`/tag/Business`}>
                <button className='tag'>
                  Business
                </button>
              </a>
              <a href={`/tag/Health`}>
                <button className='tag'>
                  Health
                </button>
              </a>
              <a href={`/tag/Javascript`}>
                <button className='tag'>
                  Javascript
                </button>
              </a>
              <a href={`/tag/Blockchain`}>
                <button className='tag'>
                  Blockchain
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function Home() {
  const [allBlogs, setAllBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const { loginData, setLoginData } = useContext(LoginContext)
  const pageRoute = useNavigate()
  const [totalUsers, setTotalUsers] = useState("")
  const [totalBlogs, setTotalBlogs] = useState("")
  const userCount = async () => {
    let res = await usersCount()
    setTotalUsers(res.data.count)
  }
  const blogCount = async () => {
    let res = await blogsCount()
    setTotalBlogs(res.data.count)
  }
  let i = 0
  const getBlogs = async () => {
    setLoading(true)
    const res = await getAllBlogs()
    setAllBlogs(res.data)
    setLoading(false)
  }
  const homeValid = async () => {
    let token = localStorage.getItem("JWTFINALTOKEN")
    setLoading(true)
    const res = await axios.get(`${url}/validuser`, { headers: { "Authorization": token } })

    if (res.data.status === 401 || !res.data.status) {
      pageRoute('/login')
    }
    else {
      pageRoute("/")
      setLoginData(res.data.userValid)
      user.push(res.data.user)
    }
  }
  useEffect(() => {
    homeValid()
    getBlogs()
    userCount()
    blogCount()
  }, [])
  return (
    <>
      <Navbar />
      <div style={{ display: loading ? "block" : "none" }} className='loading-animation'>
        <div className='loading-div'>

          <img style={{ width: "200px", height: "200px" }} src={loadingAnimation} alt="" />

        </div>
      </div>
      <div style={{ display: loading ? "none" : "" }} className='container-fluid homepage'>
        <section className='left-section'>
          <h3 className='featured'><span className='backgroundColor'>&nbsp;Featured </span>&nbsp;This Week</h3>
          <div className='featured-blogs'>
            <Blog category="Travel" title="Set Video Playback Speed With Javascript" headerImg={image} authorImg={image} publishdate="02 December 2022" readtime="3 min Read" intro="Did you come here for something in particular or just general Riker-bashing? And blowing into" />
            {/* <Blog category="Travel" title="Set Video Playback Speed With Javascript" headerImg=" " authorImg=" " publishdate="02 December 2022" readtime="3 min Read" intro="Did you come here for something in particular or just general Riker-bashing? And blowing into" /> */}
          </div>
        </section>
        <section className='right-section'>
          <div className='right-blog'>
            <h3 className='featured'><span className='backgroundColor'>&nbsp;Popular </span>&nbsp;Posted</h3>
            <div className='scroll'>
              {/* {/* <ShortBlogs shortcategory="Travel" authorImg={image} title="Design is the Mix of emotions" publishdate="23 December 2022" readtime="3 min Read" intro="Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp" /> */}
              {/* shortcategory="Travel" authorImg=" " title="Design is the Mix of emotions" publishdate="23 December 2022" readtime="3 min Read" intro="Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp" /> */}
              <ShortBlogs />
            </div>
          </div>
        </section>
      </div>
      <section style={{ display: loading ? "none" : "" }} className='section-2'>
        <div className='sec-2-left'>
          <h3 className='featured'><span className='backgroundColor'>&nbsp;Recently </span>&nbsp;Posted</h3>
          <div className='recent-blogs'>
            {
              allBlogs.map((e, index) => {
                return (
                  <a href={`/blog/${e._id}`}>
                    <div key={e._id} className='blog-card'>
                      <img onClick={() => pageRoute(`/${e._id}`)} className='recent-blog-img' src={e.image} alt='' />
                      <div className='blogInfo'>
                        <a href={`/tag/${e.category}`}>
                          <span className='category'>{e.category}</span>
                        </a>
                        <h3 className='right-blog-title mt-2'>{e.title}</h3>
                        <a style={{ textDecoration: "none" }} href={`/profile/${e.authorid}`}>
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
                        </a>
                        <div className='intro right-intro recent-blogs-intro' dangerouslySetInnerHTML={{ __html: e.description.slice(0, 150) + "..." }}></div>
                      </div>
                    </div>
                  </a>

                )

              })
            }

          </div>
        </div>
        <RightSection />
      </section>
      <div style={{ display: loading ? "none" : "" }}>


      </div>

    </>
  )
}

export default Home
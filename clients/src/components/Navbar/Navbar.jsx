import React, { useContext, useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { ImCross } from "react-icons/im"
import image from "../../assets/test.jpg"
import { LoginContext } from '../../contextProvider/Context';
import logo from "../../assets/travelbrain-logo.svg"
import defaultimage from "../../assets/defaultprofile.png"
import axios from "axios"
function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext)
  const [loginPage, setLoginPage] = useState(false)
  const pageRoute = useNavigate()
  const showSidebar = () => setSidebar(!sidebar);
  const logout = async () => {
    let token = localStorage.getItem("JWTFINALTOKEN")
    const res = await axios.get("http://localhost:8000/logout", { headers: { "Authorization": token } })
    if (res.data.status === 201) {
      localStorage.removeItem("JWTFINALTOKEN")

    }
    else {
      pageRoute('/')
    }
  }
  const homeValid = async () => {
    let token = localStorage.getItem("JWTFINALTOKEN")
    const res = await axios.get("http://localhost:8000/validuser", { headers: { "Authorization": token } })

    if (res.data.status === 401 || !res.data.status) {
      pageRoute('/login')
    }
    else {
      setLoginData(res.data.userValid)
    }
  }

  useEffect(() => {
    homeValid()
    // logout()
  }, [])
  // console.log(loginData)


  return (
    <div >
      <IconContext.Provider value={{ color: 'rgba(51, 51, 51, 1)' }}>
        <div className='main-navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <a href='/'>
            <img className='logo' src={logo} alt="" />
          </a>
        </div>
        <div>
        </div>
        <nav onClick={showSidebar} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <a style={{ textDecoration: "none" }} href={`/profile/${loginData._id}`}>
              <div className='profileSection'>
                <img className='userProfile' src={loginData.profilePic} alt="" />
                <div className='user-bio'>
                  <h4 className='user-name'>{loginData.username}</h4>
                  {/* <p className='short-description'>This need to be updated. so please make sure of it</p> */}

                </div>
              </div>
            </a>


            {SidebarData.map((item, index) => {
              if (item.title === "Logout") {
                return (
                  <>
                    <a href='/login'>

                      <li onClick={logout} key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}


                          <span className='nav-icons'>{item.title}</span>

                        </Link>
                      </li>
                    </a>
                  </>
                )
              } else {

                return (
                  <li key={index} className={item.cName}>
                    <a href={item.path}>
                      {item.icon}


                      <span className='nav-icons'>{item.title}</span>

                    </a>
                  </li>
                );
              }
            })}
          </ul>

        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
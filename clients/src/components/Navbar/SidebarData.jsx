import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { FaSearch } from "react-icons/fa"
import { BsPencilSquare, BsBookmarks } from "react-icons/bs"
import { AiOutlineHome } from "react-icons/ai"
import { GoHome } from "react-icons/go"
import { RiNotification4Line } from "react-icons/ri"
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from "axios"


export const SidebarData = [
  {
    title: 'Search',
    path: '/search',
    icon: <FaSearch />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <GoHome />,
    cName: 'nav-text'
  },
  {
    title: 'Write',
    path: '/write',
    icon: <BsPencilSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Bookmarks',
    path: '/bookmarks',
    icon: <BsBookmarks />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <BiLogOut />,
    cName: 'nav-text'
  }
];
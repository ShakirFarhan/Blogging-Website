import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Login from './components/Login/Login';
import Register from './components/Register/Register.jsx';
import Home from './components/Homepage/Home';


import Blog from './components/Blog/Blog';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Editprofile/EditProfile';
import Tag from './components/Tagwise/Tag';
import Search from './components/Search/Search';
import axios from 'axios';
import Error from './components/AdditionalPages/Error';
import Pending from './components/AdditionalPages/Pending';
import Bookmark from './components/Bookmark/Bookmark';
import Write from './components/Write/Write';
import Share from './components/AdditionalPages/Share';




function App() {
 
  return (

    <Router>

      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>

        <Route exact path='/' element={<Home/>}/>
        {/* <Route element={<Profile/>}/> */}
        <Route  path='/blog/:id' element={<Blog/>}/>
        
        <Route exact path='/navbar' element={<Navbar/>}/>
        <Route exact path='/edit/:id' element={<EditProfile/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
        <Route exact path='/tag/:id' element={<Tag/>}/>
<Route path='/search' element={<Search/>}/>
<Route path='/notifications' element={<Pending/>}/>
<Route exact path='/bookmarks' element={<Bookmark/>}/>
<Route exact path='/write' element={<Write/>}/>
<Route exact path='/share' element={<Share/>}/>



<Route path='*' element={<Error/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>

  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from "./component/Nav.jsx";
import {Routes, Route} from "react-router-dom"
import Home from './component/Home.jsx';
import Daily_log from './component/Daily_log.jsx';
import Resource_Library from './component/Resource_Library.jsx';
import Community from './component/Community.jsx';
import Crisis_suport from './component/Crisis_suport.jsx';
import Footer from './component/Footer.jsx';


function App() {
 

  return (
    <>
    <Nav/>
     <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/daily_log' element={<Daily_log/>} />
   <Route path='/Resource_Library' element={<Resource_Library/>} />
   <Route path='/Community' element={<Community/>} />
   <Route path='/Crisis_suport' element={<Crisis_suport/>} />


     </Routes>

<Footer/>
    </>
  )
}

export default App

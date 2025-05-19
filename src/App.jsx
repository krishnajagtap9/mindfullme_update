import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from "./component/Nav.jsx";
import {Routes, Route} from "react-router-dom"
import Home from './component/Home.jsx';
import About from './component/About.jsx';
import Footer from './component/Footer.jsx';
import Contact from './component/Contact.jsx';
import Sign from './component/Sign/login.jsx';
import ScrollToTop from './Scrolltotop.jsx';

function App() {
 

  return (
    <>
    <Nav/>
    <ScrollToTop />
     <Routes>
      
   <Route path='/' element={<Home/>} />
   <Route path='/About' element={<About/>} />
   <Route path='/Contact' element={<Contact/>} />
   <Route path='/sign' element={<Sign/>} />
  


     </Routes>

<Footer/>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from "./component/Nav.jsx";
import {Routes, Route} from "react-router-dom"
import Home from './component/Home.jsx';
import Library from './component/Library.jsx';
import Games from './component/Games.jsx';
import Community from './component/Community.jsx';
import Support from './component/Support.jsx';
import Footer from './component/Footer.jsx';


function App() {
 

  return (
    <>
    <Nav/>
     <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/Library' element={<Library/>} />
   <Route path='/Games' element={<Games/>} />
   <Route path='/Community' element={<Community/>} />
   <Route path='/support' element={<Support/>} />


     </Routes>

<Footer/>
    </>
  )
}

export default App

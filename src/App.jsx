import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

import './App.css';
import Nav from './component/Nav.jsx';
import Home from './component/Home.jsx';
import About from './component/About.jsx';
import Footer from './component/Footer.jsx';
import Contact from './component/Contact.jsx';
import ScrollToTop from './Scrolltotop.jsx';
import Need_login from './pages/Need_login.jsx';
import Login from './component/Sign/Login.jsx';

function App() {
  return (
    <>
      <Nav />
      <ScrollToTop />

      <Routes>
        
                <Route path='/login' element={<Login/>} />

        <Route
          path='/*'
          element={
            <SignedIn>
              <Routes>
        <Route path='/' element={<Home />} />

                <Route path='/About' element={<About />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/need_login' element={<Need_login />} />
              </Routes>
            </SignedIn>
          }
        />

        <Route
          path='/*'
          element={
            <SignedOut>
              <Navigate to='/need_login' />
            </SignedOut>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

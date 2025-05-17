import React from 'react'
import { LuBrain } from "react-icons/lu";

const Footer = () => {
  return (
 <>
 <section className='w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-2   ml-2.5 mt-7 mb-4 ' data-aos="fade">

<div className='w-full sm:w-64 '>
    <h1 className='flex  font-bold text-2xl items-center justify-items-start mb-2 '><LuBrain /> Mindfullme</h1>
    <p className=''>Your companion for mental wellness and personal growth.</p>
</div>

<div >
    <h1 className='mb-3 text-shadow-lg font-mideum'>Platform</h1>
   <ol className='text-gray-600'>
    <li>About us</li>
    <li>Contact </li>
    <li>Support</li>
    <li>Privacy Policy</li>
    <li>Terms of Services</li>
   </ol>
</div>

<div >
    <h1 className='mb-3 text-shadow-lg font-mideum'>Features</h1>
   <ol className='text-gray-600'>
    <li>Dashboard</li>
    <li>Ai Recomandatition</li>
    <li>Resource Library</li>
    <li>Community</li>
    <li>Games</li>
   </ol>
</div>


<div >
    <h1 className='mb-3 text-shadow-lg font-mideum'>Connect</h1>
   <ol className='text-gray-600'>
    <li>Twitter</li>
    <li>Instagram </li>
    <li>Facebook</li>
    <li>Linkdin</li>
    <li>youtube</li>
   </ol>
</div>








 </section>
<hr className='sm:w-4/5 m-auto' />

<section className='flex w-full h-16 items-center justify-center text-shadow-lg ml-3'>
    <div><p> ©  2025 MindfullMe. All rights reserved</p></div>
    <div className=' flex justify-end w-1/2'><p className='flex'>Accessibility
Sitemap
Cookie Policy</p></div>
</section>
 
 </>
  )
}

export default Footer
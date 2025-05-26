
import Button from '@mui/material/Button';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PiUsersThreeDuotone } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../index.css"
import { CgProfile } from "react-icons/cg";
import { IoIosMusicalNote } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaAlignLeft } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { IoMdCloudDone } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa';
import Icon1 from "../assets/icon1"


const About = () => {

    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

 const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    // Start count when component mounts (or when visible, if you use intersection observer)
    setStartCount(true);
  }, []);
   const { ref, inView } = useInView({
    triggerOnce: true, // count only once
    threshold: 0.3, // trigger when 30% of the section is visible
  });
  return (
    <>
    
        <section className=" max-w-full h-screen flex flex-col-reverse sm:flex-row md:flex-row   ">
        
        <div className=" h-screen w-full flex items-center justify-center  bg-[#DFF5E8]">
          <div className='w-4/5  h-3/4 lg:h-3/6  ' data-aos="fade">
            
            <h1 className='text-xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6 md:text-4xl'>
            Your Holistic Mental
Health Companion
            </h1>

            <p className='my-3 text-xs text-shadow-lg md:text-xl lg:text-2xl '>
           MindfulMe is a comprehensive web platform designed to empower
users in monitoring, managing, and improving their mental wellbeing through personalized, culturally sensitive, and user-friendly
tools.
            </p>
<div className="flex space-x-4">
 


  <button className="px-3 py-2 text-xs md:px-4  md:py-2 md:text-xl mt-3 lg:mt-7 rounded-full bg-green-500 text-white transition">
  Get started
  </button>
</div>


          </div>
        </div>

     <div className=" h-full w-full flex items-center justify-center relative " data-aos="fade">
 
  <img className='w-full h-full object-contain' src="https://www.holy-cross.com/sites/default/files/hg_features/hg_post/fb2498a8dc4aaf1298a6dd96f17aa6b4.jpg" alt="" />
</div>

      </section>




  <section className="max-w-full h-screen flex flex-col-reverse sm:flex-row md:flex-row">
  
  <div className="h-screen w-full flex items-center justify-center">
    <div className="w-4/5 h-3/4 lg:h-3/6" data-aos="fade">
      <h1 className="text-xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6 md:text-4xl">
        Best way to test new<br />ideas is wireframing
      </h1>
      <p className="my-3 text-xs text-shadow-lg md:text-xl lg:text-2xl">
        We believe mental health support should be approachable and personal. MindfullMe is here to
        make every step of your journey easier — whether it’s journaling emotions, breathing exercises, or
        connecting with a community
      </p>
      <div className="flex space-x-4">
        <button className="px-3 py-2 text-xs md:px-6 md:py-2 md:text-xl rounded-full mt-6 bg-green-500 text-white transition">
          Get started for free
        </button>
      </div>
    </div>
  </div>

 
  <div className="relative h-screen w-full flex items-center justify-center">
 
    <img
      className="absolute w-2/4 h-3/4 object-contain border shadow-md rounded-md hover:z-40 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer sm:w-4/6  sm:h-3/5 lg:h-9/12 lg:w-[60%]"
      src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
      alt=""
      data-aos="zoom-in"
    />
    
    {/* Bottom Left Horizontal Image (middle one that scales) */}
    <img
      className="absolute w-1/4 lg:w-2/5 h-1/3 object-contain border shadow-md rounded-md bottom-12 left-12 z-20 hover:z-20 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer sm:min-w-[45%] sm:left-0 sm:bottom-20"
      src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
      alt=""
          data-aos="fade"
          data-aos-delay="200"
    />

  
    <img
      className="absolute w-1/4 h-1/3 object-contain border shadow-md rounded-md top-20 md:top-43  right-12 z-30 hover:z-20 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer  sm:h-1/4 sm:top-40 sm:right-5 lg:h-1/3 lg:top-35"
      src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
      alt=""
      data-aos="fade"
          data-aos-delay="200"
    />
  </div>
</section>








<section className="bg-gray-50 py-16 px-4 text-center" >
      <h2 className="text-4xl font-semibold mb-4 text-black text-shadow-lg">Our Journey</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-16 md:text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16" >
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
          <div className="bg-gray-200 rounded-2xl p-4 mb-4">
            <FaMapMarkerAlt className="text-green-500 text-5xl" />
          </div>
          <h3 className="font-semibold  mb-2 text-2xl">Sep 2024</h3>
          <p className="text-gray-600 max-w-xs">Idea sparked by a group of students looking for a self-care space</p>
        </div>

        {/* Connecting Line */}
        <div className="hidden md:block w-16 h-1 bg-gray-300 rounded-full"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
          <div className="bg-gray-200 rounded-2xl p-4 mb-4">
            <FaCalendarAlt className="text-green-500 text-5xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2 md:text-2xl">May 2025</h3>
          <p className="text-gray-600 max-w-xs">First launch with AI-powered mood tracker + calming content</p>
        </div>

        {/* Connecting Line */}
        <div className="hidden md:block w-16 h-1 bg-gray-300 rounded-full"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
          <div className="bg-gray-200 rounded-2xl p-4 mb-4">
            <FaCar className="text-green-500 text-5xl" />
          </div>
          <h3 className="font-semibold text-lg mb-2 md:text-2xl">Future</h3>
          <p className="text-gray-600 max-w-xs">Expansion with licensed therapists, real-time support groups</p>
        </div>
      </div>
    </section>



<section className="w-full p-4 mt-10" data-aos="fade">
  <h1 className="text_style flex justify-center p-25 text-nowrap">Meet Our Team</h1>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Krish Bhagat",
        desc: "Founder & CEO – AI/ML and web developer, FastAPI expert, and AI prompting engineer specializing in sign language translators and real-time analytics.",
        img: "https://www.kodrish.me/krish.png" // Replace with actual image URL
      },
      {
        title: "Krishna Jagtap",
        desc: "Co-Founder & CTO – Full-stack web and app developer specializing in MERN stack, SQL, and React Native. Focused on backend development, authentication systems, and hybrid apps.",
        img: "https://www.kodrish.me/krishna.png" // Replace with actual image URL
      },
      {
        title: "Ritik Pawar",
        desc: "Co-Founder & CMO – Software Developer and Tech Entrepreneur with expertise in C++, Data Structures & Algorithms (DSA), and Full-Stack Web Development (MERN stack).",
        img: "https://www.kodrish.me/ritik.png" // Replace with actual image URL
      },
      {
        title: "Sahil Sharma",
        desc: "Web Developer – Passionate full-stack web and app developer specializing in MERN stack, SQL, and React. Provides cutting-edge web apps and 3D websites.",
        img: "https://www.kodrish.me/sahil.png" // Replace with actual image URL
      }
    ].map((member, index) => (
      <div
        key={index}
        className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col group transition-transform"
      >
        <img
          src={member.img}
          alt={member.title}
          className="w-full h-40 object-contain"
        />
        <div className="p-4 bg-white flex flex-col justify-center h-40 transform transition duration-300 group-hover:-translate-y-36">
          <h2 className="text-lg font-semibold mb-1">{member.title}</h2>
          <p className="text-gray-700 text-sm">{member.desc}</p>
        </div>
      </div>
    ))}
  </div>


</section>



<section className="w-full bg-gray-50">
  <div className="w-full flex flex-col items-center justify-center text-center py-10">
    <h1 className="text-3xl font-bold text-shadow-lg mb-2">Community Testimonials</h1>
   
  </div>

  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {[
      {
        text: "MindfulMe helped me build a habit of checking in with myself every day. I' more aware of my emotions now.",
        author: "-Riya, 19"
      },
      {
        text: "The guided meditations have been a game-changer for my anxiety. I use them every morning."
,
        author: "-Marcus, 27"
      },
      {
        text: "MindfulMe helped me build a habit of checking in with myself every day. I'm more aware of my emotions now",
        author: "-Elena, 32"
      }
    ].map((testimonial, idx) => (
      <div
        key={idx}
        className="bg-white p-6 rounded-lg shadow-lg text-shadow-md h-full flex flex-col justify-between"
        data-aos="fade"
      >
        <p className="text-gray-800 mb-4">{testimonial.text}</p>
        <div className="flex items-center gap-3 mt-4">
          <p className="font-semibold text-green-500">{testimonial.author}</p>
        </div>
      </div>
    ))}
  </div>
</section>


<div className="bg-white font-sans px-6 py-12 max-w-6xl mx-auto text-center  " data-aos="fade " data-aos-offset="200">
      <h1 className="text-4xl md:text-5xl font-semibold text-black text-shadow-lg mb-9">
        Every emotional journey is valid.
      </h1>
      <p className="text-lg mt-2 text-gray-700">
        We welcome everyone, from every background.
      </p>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-20 md:gap-50">
   
        <div className="w-full md:w-1/2 bg-slate-300 aspect-square flex items-center justify-center" data-aos="zoom-in">
          <img src=" https://i.pinimg.com/236x/eb/80/0a/eb800a3f92e7a2d131c747b77256b03e.jpg" alt="" />
        </div>

   
        <div className="w-full md:w-1/2 flex flex-col gap-8 text-left">
       
          <div className="flex items-center gap-4" data-aos="fade">
            <div className="w-8 h-8 border-2 border-gray-400 rounded-md"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 md:text-2xl">Empathy</h3>
              <p className="text-gray-600 text-sm md:text-xl">Every emotional journey is valid.</p>
            </div>
          </div>

  
          <div className="flex items-center gap-4" data-aos="fade">
            <div className="w-8 h-8 bg-gray-400 rounded-md flex items-center justify-center">
              <span className="text-white text-sm">🏷️</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 md:text-2xl">Privacy</h3>
              <p className="text-gray-600 text-sm  md:text-xl">Your data is yours — always.</p>
            </div>
          </div>

          <div className="flex items-center gap-4" data-aos="fade">
            <div className="w-8 h-8 bg-gray-300 rounded-md "></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 md:text-2xl">Engagement</h3>
              <p className="text-gray-600 text-sm  md:text-xl">Healing can be interactive and rewarding.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


 <section
      ref={ref}
      className="w-full min-h-screen flex flex-col items-center justify-end bg-white md:mt-0"
      data-aos="fade"
      data-offset="1000"
    >
    
      <h1 className="text-3xl mt-20 mb-20 md:text-4xl font-bold text-shadow-lg text-center">
        Trusted by Thousands
      </h1>

   
      <div className="w-full px-4 lg:px-0 mb-10">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full lg:w-4/5 mx-auto">
      
         
          <div className="shadow-2xl flex flex-col items-center text-center bg-white rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
            <h2 className="font-semibold text-3xl md:text-5xl text-green-600 mb-4 min-h-[80px]">
              {inView ? <CountUp end={500000} duration={2} separator="," /> : '0'}+
            </h2>
            <p className="text-base md:text-2xl text-gray-600 flex-grow flex items-center justify-center">
              moods tracked
            </p>
          </div>


          <div className="shadow-2xl flex flex-col items-center text-center bg-white rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
            <h2 className="font-semibold text-3xl md:text-5xl text-green-600 mb-4 min-h-[80px]">
              {inView ? <CountUp end={2000000} duration={2.5} separator="," /> : '0'}+
            </h2>
            <p className="text-base md:text-2xl text-gray-600 flex-grow flex items-center justify-center">
              minutes of calming<br />resources played
            </p>
          </div>

      
          <div className="shadow-2xl flex flex-col items-center text-center bg-white rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
            <h2 className="font-semibold text-3xl md:text-5xl text-green-600 mb-4 min-h-[80px]">
              {inView ? <CountUp end={25000} duration={2} separator="," /> : '0'}+
            </h2>
            <p className="text-base md:text-2xl text-gray-600 flex-grow flex items-center justify-center">
              community chats hosted
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-2/5 bg-[#9691A1] py-6 text-white text-center flex flex-col justify-center items-center gap-4 px-4">
        <h1 className="text-lg md:text-2xl font-bold">Stay informed about mental wellness</h1>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-full sm:rounded-l-full sm:rounded-r-none bg-white w-72 text-black focus:outline-none"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-full sm:rounded-r-full sm:rounded-l-none -ml-0 sm:-ml-2">
            Subscribe
          </button>
        </form>
      </div>
    </section>






  






    </>
  )
}

export default About
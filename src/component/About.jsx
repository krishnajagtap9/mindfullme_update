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
import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa';
import Icon1 from "../assets/icon1"

// --- Particle Background (copied from Home.jsx) ---
const GradientAnimationStyle = () => (
  <style>
    {`
      .pure-gradient-bg {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
      }
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .particles-bg-canvas {
        position: fixed;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        top: 0;
        pointer-events: none;
      }
      .particles-bg-wrapper {
        position: absolute;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        top: 0;
        pointer-events: none;
      }
    `}
  </style>
);

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Variables
    const particles = [];
    const numParticles = 100;
    const maxDistance = 120;

    // Mouse position
    const mouse = { x: null, y: null };

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`
      });
    }

    // Dibujar partículas
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      connectParticles();
    }

    // Conectar partículas cercanas
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Actualizar partículas
    function updateParticles() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Atracción al mouse
        if (mouse.x && mouse.y) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            p.vx += dx / 1000;
            p.vy += dy / 1000;
          }
        }
      });
    }

    // Loop principal
    let animationId;
    function animate() {
      drawParticles();
      updateParticles();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Mouse movimiento
    function mouseMoveHandler(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function mouseLeaveHandler() {
      mouse.x = null;
      mouse.y = null;
    }
    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseleave', mouseLeaveHandler);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('mouseleave', mouseLeaveHandler);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="particles-bg-wrapper" style={{top: 0}}>
      <canvas ref={canvasRef} className="particles-bg-canvas" />
    </div>
  );
};

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Gold color for text
  const gold = "#FFD700";
  // Black for background
  const black = "#111";

  return (
    <>
      <GradientAnimationStyle />
      {/* Section 1: Gradient only, no particles */}
      <section className="max-w-full h-screen flex flex-col-reverse sm:flex-row md:flex-row pure-gradient-bg" style={{position: "relative", zIndex: 1}}>
        <div className="h-screen w-full flex items-center justify-center bg-transparent bg-opacity-70">
          <div className='w-4/5 h-3/4 lg:h-3/6' data-aos="fade">
            <h1 className='text-xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6 md:text-4xl' style={{color: gold}}>
              Your Holistic Mental Health Companion
            </h1>
            <p className='my-3 text-xs text-shadow-lg md:text-xl lg:text-2xl' style={{color: gold}}>
              MindfulMe is a comprehensive web platform designed to empower users in monitoring, managing, and improving their mental wellbeing through personalized, culturally sensitive, and user-friendly tools.
            </p>
            <div className="flex space-x-4">
              <button className="px-3 py-2 text-xs md:px-4 md:py-2 md:text-xl mt-3 lg:mt-7 rounded-full" style={{background: gold, color: black, fontWeight: 600}}>
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center relative" data-aos="fade">
          <img className='w-full h-full object-contain' src="https://www.holy-cross.com/sites/default/files/hg_features/hg_post/fb2498a8dc4aaf1298a6dd96f17aa6b4.jpg" alt="" />
        </div>
      </section>

      {/* Particle background starts below section 1 */}
      <div style={{position: "relative", width: "100%", minHeight: "100vh", zIndex: 0, background: black}}>
        <ParticlesBackground />
        <div style={{position: "relative", zIndex: 1}}>
          <section className="max-w-full h-screen flex flex-col-reverse sm:flex-row md:flex-row bg-transparent" style={{color: gold}}>
            <div className="h-screen w-full flex items-center justify-center">
              <div className="w-4/5 h-3/4 lg:h-3/6" data-aos="fade">
                <h1 className="text-xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6 md:text-4xl" style={{color: gold}}>
                  Best way to test new<br />ideas is wireframing
                </h1>
                <p className="my-3 text-xs text-shadow-lg md:text-xl lg:text-2xl" style={{color: gold}}>
                  We believe mental health support should be approachable and personal. MindfulMe is here to make every step of your journey easier — whether it’s journaling emotions, breathing exercises, or connecting with a community
                </p>
                <div className="flex space-x-4">
                  <button className="px-3 py-2 text-xs md:px-6 md:py-2 md:text-xl rounded-full mt-6" style={{background: gold, color: black, fontWeight: 600}}>
                    Get started for free
                  </button>
                </div>
              </div>
            </div>
            <div className="relative h-screen w-full flex items-center justify-center">
              <img
                className="absolute w-2/4 h-3/4 object-contain border shadow-md rounded-md hover:z-40 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer sm:w-4/6 sm:h-3/5 lg:h-9/12 lg:w-[60%]"
                src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
                alt=""
                data-aos="zoom-in"
              />
              <img
                className="absolute w-1/4 lg:w-2/5 h-1/3 object-contain border shadow-md rounded-md bottom-12 left-12 z-20 hover:z-20 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer sm:min-w-[45%] sm:left-0 sm:bottom-20"
                src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
                alt=""
                data-aos="fade"
                data-aos-delay="200"
              />
              <img
                className="absolute w-1/4 h-1/3 object-contain border shadow-md rounded-md top-20 md:top-43 right-12 z-30 hover:z-20 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer sm:h-1/4 sm:top-40 sm:right-5 lg:h-1/3 lg:top-35"
                src="https://rehabtechsolutions.com/wp-content/uploads/2024/09/placeholder.jpg"
                alt=""
                data-aos="fade"
                data-aos-delay="200"
              />
            </div>
          </section>

          <section className="bg-transparent py-16 px-4 text-center" style={{color: gold}}>
            <h2 className="text-4xl font-semibold mb-4 text-shadow-lg" style={{color: gold}}>Our Journey</h2>
            <p className="max-w-2xl mx-auto mb-16 md:text-2xl" style={{color: gold}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-16">
              <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
                <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                  <FaMapMarkerAlt className="text-yellow-400 text-5xl" />
                </div>
                <h3 className="font-semibold mb-2 text-2xl" style={{color: gold}}>Sep 2024</h3>
                <p className="max-w-xs" style={{color: gold}}>Idea sparked by a group of students looking for a self-care space</p>
              </div>
              <div className="hidden md:block w-16 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
                <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                  <FaCalendarAlt className="text-yellow-400 text-5xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2 md:text-2xl" style={{color: gold}}>May 2025</h3>
                <p className="max-w-xs" style={{color: gold}}>First launch with AI-powered mood tracker + calming content</p>
              </div>
              <div className="hidden md:block w-16 h-1 bg-gray-700 rounded-full"></div>
              <div className="flex flex-col items-center text-center md:text-2xl" data-aos="fade">
                <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                  <FaCar className="text-yellow-400 text-5xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2 md:text-2xl" style={{color: gold}}>Future</h3>
                <p className="max-w-xs" style={{color: gold}}>Expansion with licensed therapists, real-time support groups</p>
              </div>
            </div>
          </section>

          <section className="w-full p-4 mt-10 bg-transparent" data-aos="fade" style={{color: gold}}>
            <h1 className="text_style flex justify-center p-25 text-nowrap" style={{color: gold}}>Meet Our Team</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Krish Bhagat",
                  desc: "Founder & CEO – AI/ML and web developer, FastAPI expert, and AI prompting engineer specializing in sign language translators and real-time analytics.",
                  img: "https://www.kodrish.me/krish.png"
                },
                {
                  title: "Krishna Jagtap",
                  desc: "Co-Founder & CTO – Full-stack web and app developer specializing in MERN stack, SQL, and React Native. Focused on backend development, authentication systems, and hybrid apps.",
                  img: "https://www.kodrish.me/krishna.png"
                },
                {
                  title: "Ritik Pawar",
                  desc: "Co-Founder & CMO – Software Developer and Tech Entrepreneur with expertise in C++, Data Structures & Algorithms (DSA), and Full-Stack Web Development (MERN stack).",
                  img: "https://www.kodrish.me/ritik.png"
                },
                {
                  title: "Sahil Sharma",
                  desc: "Web Developer – Passionate full-stack web and app developer specializing in MERN stack, SQL, and React. Provides cutting-edge web apps and 3D websites.",
                  img: "https://www.kodrish.me/sahil.png"
                }
              ].map((member, index) => (
                <div
                  key={index}
                  className="rounded-xl shadow-md overflow-hidden flex flex-col group transition-transform"
                  style={{background: "#181818"}}
                >
                  <img
                    src={member.img}
                    alt={member.title}
                    className="w-full h-40 object-contain"
                  />
                  <div className="p-4 flex flex-col justify-center h-40 transform transition duration-300 group-hover:-translate-y-36" style={{background: "#181818"}}>
                    <h2 className="text-lg font-semibold mb-1" style={{color: gold}}>{member.title}</h2>
                    <p className="text-sm" style={{color: gold}}>{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full" style={{background: black, color: gold}}>
            <div className="w-full flex flex-col items-center justify-center text-center py-10">
              <h1 className="text-3xl font-bold text-shadow-lg mb-2" style={{color: gold}}>Community Testimonials</h1>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {[
                {
                  text: "MindfulMe helped me build a habit of checking in with myself every day. I'm more aware of my emotions now.",
                  author: "-Riya, 19"
                },
                {
                  text: "The guided meditations have been a game-changer for my anxiety. I use them every morning.",
                  author: "-Marcus, 27"
                },
                {
                  text: "MindfulMe helped me build a habit of checking in with myself every day. I'm more aware of my emotions now",
                  author: "-Elena, 32"
                }
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-black p-6 rounded-lg shadow-lg text-shadow-md h-full flex flex-col justify-between"
                  data-aos="fade"
                  style={{color: gold, border: `1px solid ${gold}`}}
                >
                  <p className="mb-4">{testimonial.text}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-transparent font-sans px-6 py-12 max-w-6xl mx-auto text-center" data-aos="fade " data-aos-offset="200" style={{color: gold}}>
            <h1 className="text-4xl md:text-5xl font-semibold text-shadow-lg mb-9" style={{color: gold}}>
              Every emotional journey is valid.
            </h1>
            <p className="text-lg mt-2" style={{color: gold}}>
              We welcome everyone, from every background.
            </p>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-20 md:gap-50">
              <div className="w-full md:w-1/2 bg-slate-700 aspect-square flex items-center justify-center" data-aos="zoom-in">
                <img src=" https://i.pinimg.com/236x/eb/80/0a/eb800a3f92e7a2d131c747b77256b03e.jpg" alt="" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-8 text-left">
                <div className="flex items-center gap-4" data-aos="fade">
                  <div className="w-8 h-8 border-2 border-yellow-400 rounded-md"></div>
                  <div>
                    <h3 className="text-lg font-semibold md:text-2xl" style={{color: gold}}>Empathy</h3>
                    <p className="text-sm md:text-xl" style={{color: gold}}>Every emotional journey is valid.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4" data-aos="fade">
                  <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center">
                    <span className="text-black text-sm">🏷️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold md:text-2xl" style={{color: gold}}>Privacy</h3>
                    <p className="text-sm md:text-xl" style={{color: gold}}>Your data is yours — always.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4" data-aos="fade">
                  <div className="w-8 h-8 bg-yellow-300 rounded-md"></div>
                  <div>
                    <h3 className="text-lg font-semibold md:text-2xl" style={{color: gold}}>Engagement</h3>
                    <p className="text-sm md:text-xl" style={{color: gold}}>Healing can be interactive and rewarding.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section
            ref={ref}
            className="w-full min-h-screen flex flex-col items-center justify-end bg-transparent md:mt-0"
            data-aos="fade"
            data-offset="1000"
            style={{color: gold}}
          >
            <h1 className="text-3xl mt-20 mb-20 md:text-4xl font-bold text-shadow-lg text-center" style={{color: gold}}>
              Trusted by Thousands
            </h1>
            <div className="w-full px-4 lg:px-0 mb-10">
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full lg:w-4/5 mx-auto">
                <div className="shadow-2xl flex flex-col items-center text-center bg-[#181818] rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
                  <h2 className="font-semibold text-3xl md:text-5xl text-yellow-400 mb-4 min-h-[80px]">
                    {inView ? <CountUp end={500000} duration={2} separator="," /> : '0'}+
                  </h2>
                  <p className="text-base md:text-2xl flex-grow flex items-center justify-center" style={{color: gold}}>
                    moods tracked
                  </p>
                </div>
                <div className="shadow-2xl flex flex-col items-center text-center bg-[#181818] rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
                  <h2 className="font-semibold text-3xl md:text-5xl text-yellow-400 mb-4 min-h-[80px]">
                    {inView ? <CountUp end={2000000} duration={2.5} separator="," /> : '0'}+
                  </h2>
                  <p className="text-base md:text-2xl flex-grow flex items-center justify-center" style={{color: gold}}>
                    minutes of calming<br />resources played
                  </p>
                </div>
                <div className="shadow-2xl flex flex-col items-center text-center bg-[#181818] rounded-2xl p-8 flex-1 min-w-[300px] md:min-w-[200px] transition-transform hover:scale-105">
                  <h2 className="font-semibold text-3xl md:text-5xl text-yellow-400 mb-4 min-h-[80px]">
                    {inView ? <CountUp end={25000} duration={2} separator="," /> : '0'}+
                  </h2>
                  <p className="text-base md:text-2xl flex-grow flex items-center justify-center" style={{color: gold}}>
                    community chats hosted
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-2/5 bg-[#181818] py-6 text-center flex flex-col justify-center items-center gap-4 px-4">
              <h1 className="text-lg md:text-2xl font-bold" style={{color: gold}}>Stay informed about mental wellness</h1>
              <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-full sm:rounded-l-full sm:rounded-r-none bg-white w-72 text-black focus:outline-none"
                />
                <button className="px-4 py-2 rounded-full sm:rounded-r-full sm:rounded-l-none -ml-0 sm:-ml-2" style={{background: gold, color: black, fontWeight: 600}}>
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default About;
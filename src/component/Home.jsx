import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import { TypeAnimation } from 'react-type-animation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CgProfile } from "react-icons/cg";
import { IoIosMusicalNote } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaAlignLeft } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { IoMdCloudDone } from "react-icons/io";
import Image1 from '../images/image1.png';
import Image2 from '../images/image2.png';
import Image3 from '../images/image3.png';
import Image4 from '../images/image4.png';
import Image5 from '../images/image5.png';
import Image6 from '../images/image6.png';
import Image7 from '../images/image7.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../index.css"

// Add this component at the top level of your file
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

// Particle background component (starts below section 1)
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

const Home = () => {
  const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <CgProfile size={28} />,
      title: 'AI Health Recommendations',
      subtitle: 'AI Health Recommendations',
      content: 'Get personalized tips based on your mood patterns.',
    },
    {
      icon: <IoIosMusicalNote size={28} />,
      title: 'Calming Library',
      subtitle: 'Calming Library',
      content: 'Access music, ASMR, meditations, and videos.',
    },
    {
      icon: <BsPeopleFill size={28} />,
      title: 'Community Support',
      subtitle: 'Community Support',
      content: 'Join peer groups and share your mental health journey.',
    },
    {
      icon: <FaAlignLeft size={28} />,
      title: 'Gamified Healing',
      subtitle: 'Gamified Healing',
      content: 'Track mood and earn rewards by completing wellness challenges.',
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Gold color for text
  const gold = "#FFD700";
  // Black for background
  const black = "#111";

  return (
    <>
      <GradientAnimationStyle />
      <section className="max-w-full h-screen flex flex-col sm:flex-row pure-gradient-bg" style={{position: "relative", zIndex: 1}}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-4/5 h-3/4 lg:h-3/6" data-aos="fade">
            <h1 className="text-3xl font-bold h-32 text-shadow-lg sm:min-h-1/6" style={{color: gold}}>
              <TypeAnimation
                sequence={[
                  'Take Charge of Your Mental Wellness',
                  1500,
                  'Track Your Moods, Thoughts & Patterns.....',
                  1500,
                  'Get Personalized AI Recommendations',
                  1500,
                  'Join a Supportive Community ...',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: 'inline-block' }}
                repeat={Infinity}
              />
            </h1>

            <p className="my-3 text-shadow-lg" style={{color: gold}}>
              Track moods, explore calming resources, and connect with a supportive community
            </p>

            <div className="flex space-x-4">
              <button className="px-6 py-2 rounded-full" style={{background: gold, color: black, fontWeight: 600}}>
                Get started
              </button>
            </div>

            <p className="my-3 text-shadow-lg" style={{color: gold}}>"Healing begins with awareness."</p>
          </div>
        </div>

        <div className="h-full w-full flex items-center justify-center relative">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="h-[60%] object-contain rounded-2xl transition-opacity duration-1000 ease-in-out"
            key={currentImage}
          />
        </div>
      </section>

      {/* Particle background starts below section 1 */}
      <div style={{position: "relative", width: "100%", minHeight: "100vh", zIndex: 0, background: black}}>
        <ParticlesBackground />
        <div style={{position: "relative", zIndex: 1}}>
          <section className="w-full bg-transparent" style={{color: gold}}>
            <div className="w-full h-1/2 flex flex-col items-center justify-center text-center lg:h-1/6">
              <h1 className="text-3xl font-bold text-shadow-lg mb-2" style={{color: gold}}>Why MindfullMe?</h1>
              <p className="my-3 text-shadow-lg max-w-xl p-4" style={{color: gold}}>
                Discover how MindfullMe can help you on your mental health journey
              </p>
            </div>

            <div className="w-full h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 items-center justify-center">
              {features.map((feature, index) => (
                <Box
                  key={index}
                  data-aos="fade"
                  data-aos-delay={index * 200}
                  sx={{
                    minWidth: 230,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Card variant="outlined" sx={{ height: '100%' ,textAlign:"center" ,bgcolor:"rgba(30,30,30,0.9)", border:"none"}} className=" ">
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2" style={{color: gold, justifyContent: "center"}}>
                        {feature.icon}
                      </div>
                      <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold', whiteSpace:"nowrap", fontSize:{md:"1.2vmax" }, color: gold }}>
                        {feature.subtitle}
                      </Typography>
                      <Typography variant="body2" sx={{color: gold}}>
                        {feature.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </div>
          </section>

          <section className='w-full h-[60vh] flex gap-y-8 justify-center items-center text-center flex-col bg-transparent' style={{color: gold}}>
            <h1 className='text-3xl font-bold text-shadow-lg'>Track Your Mood Journey</h1>
            <button className='button_css2' style={{background: gold, color: black, fontWeight: 600}}>Try Mood Tracker</button>
          </section>

          {/* Resource Highlights Section with Card Hover Animation */}
          <section className="w-full p-4 mt-10" data-aos="fade" style={{color: gold}}>
            <h1 className="text_style flex justify-center p-8" style={{color: gold}}>Resource Highlights</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Meditation Music",
                  desc: "Calming sounds to help you relax and focus.",
                  img: "https://i.ytimg.com/vi/jWWuT2MchtQ/maxresdefault.jpg",
                  category: "Music",
                  time: "15 min",
                  author: "Mindful Team"
                },
                {
                  title: "ASMR Playlist",
                  desc: "Soothing sounds to help you sleep better.",
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3lUpzqbrZtnHQ7Yh8ISIQRaC85LiT-m3ZBt4sxoAaazQ-bfj",
                  category: "ASMR",
                  time: "5 min",
                  author: "Mindful Team"
                },
                {
                  title: "Calming Visuals",
                  desc: "Beautiful scenes to ease your mind.",
                  img: "https://rukminim2.flixcart.com/image/850/1000/krayqa80/wallpaper/b/d/k/91-58-pp-design-226-print-panda-original-imag54gbvfuqfqqz.jpeg?q=20&crop=false",
                  category: "Visuals",
                  time: "10 min",
                  author: "Mindful Team"
                },
                {
                  title: "Breathing Exercises",
                  desc: "Guided techniques for stress relief.",
                  img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMGmEMB7QyXqIrN16krCaE2mQtMj_6j6OzemhPMjzUj1RJbd2z",
                  category: "Breathing",
                  time: "8 min",
                  author: "Mindful Team"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-xl shadow-md overflow-hidden flex flex-col group transition-transform hover:shadow-xl"
                  style={{ minHeight: 340, background: "rgba(30,30,30,0.95)" }}
                >
                  {/* Card image with hover effect */}
                  <div
                    className="w-full h-40 bg-center bg-cover transition-all duration-300"
                    style={{
                      backgroundImage: `url('${item.img}')`,
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                  ></div>
                  {/* Hover overlay */}
                  <div className="absolute top-0 left-0 w-full h-40 opacity-0 group-hover:opacity-30 transition duration-200 bg-black rounded-t-xl"></div>
                  {/* Info hover */}
                  <div className="absolute top-0 left-0 w-full h-40 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-between items-center">
                      <span className="bg-black/80 text-xs px-2 py-1 rounded font-semibold" style={{color: gold}}>{item.category}</span>
                      <span className="flex items-center gap-1 text-xs bg-black/80 px-2 py-1 rounded" style={{color: gold}}>
                        <svg className="w-4 h-4" fill="currentColor" style={{color: gold}} viewBox="0 0 24 24">
                          <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                        </svg>
                        {item.time}
                      </span>
                    </div>
                  </div>
                  {/* Card Info */}
                  <div className="p-4 flex flex-col justify-center h-40">
                    <h2 className="text-lg font-semibold mb-1" style={{color: gold}}>{item.title}</h2>
                    <p className="text-sm mb-2" style={{color: gold}}>{item.desc}</p>
                    <span className="text-xs" style={{color: gold}}>by <span className="font-semibold" style={{color: gold}}>{item.author}</span></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 font-semibold rounded-full transition border" style={{borderColor: gold, color: gold}}>
                View Full Library
              </button>
            </div>
          </section>

          <section className="w-full" style={{background: black, color: gold}}>
            <div className="w-full flex flex-col items-center justify-center text-center py-10">
              <h1 className="text-3xl font-bold text-shadow-lg mb-2" style={{color: gold}}>Community Testimonials</h1>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {[
                {
                  text: "The guided meditations have been a game changer for my anxiety. I use them every morning.",
                  author: "-Riya, 19"
                },
                {
                  text: "I love the community aspect. It's comforting to know others are on similar journeys.",
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

          <section className="w-full h-screen flex flex-col items-center justify-end bg-transparent md:mt-0" data-aos="fade" data-offset="1000" style={{color: gold}}>
            <h1 className="text-2xl font-bold mb-10" style={{color: gold}}>How It Works</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl mb-16 px-4">

              <div className="flex flex-col items-center text-center">
                <IoPersonAddOutline className="text-yellow-400 text-4xl mb-4" />
                <h2 className="font-semibold text-lg mb-1">Sign Up</h2>
                <p className="text-sm" style={{color: gold}}>Create your account in seconds</p>
              </div>

              <div className="hidden md:block text-yellow-400 text-2xl">
                <FaArrowRight />
              </div>

              <div className="flex flex-col items-center text-center">
                <AiOutlineStock className="text-yellow-400 text-4xl mb-4" />
                <h2 className="font-semibold text-lg mb-1">Track Your Mood</h2>
                <p className="text-sm" style={{color: gold}}>Log how you feel daily</p>
              </div>

              <div className="hidden md:block text-yellow-400 text-2xl">
                <FaArrowRight />
              </div>

              <div className="flex flex-col items-center text-center">
                <IoMdCloudDone className="text-yellow-400 text-4xl mb-4" />
                <h2 className="font-semibold text-lg mb-1">Get Suggestions</h2>
                <p className="text-sm" style={{color: gold}}>Receive personalized resources</p>
              </div>
            </div>

            <div className="w-full h-2/5 py-6 text-center flex flex-col justify-center items-center gap-2" style={{background: "#181818"}}>
              <h1 className="text-lg md:text-2xl font-bold mb-4" style={{color: gold}}>Stay informed about mental wellness</h1>
              <form className="flex justify-center items-center gap-2 px-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-full rounded-r-none bg-white w-64 text-black focus:outline-none"
                />
                <button className="rounded-l-none -ml-2" style={{background: gold, color: black, padding: "0.5rem 1rem", borderRadius: "9999px"}}>
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
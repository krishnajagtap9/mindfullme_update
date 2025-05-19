import {useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import { TypeAnimation } from 'react-type-animation';

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
import Image1 from '../images/image1.png';
import Image2 from '../images/image2.png';
import Image3 from '../images/image3.png';
import Image4 from '../images/image4.png';
import Image5 from '../images/image5.png';
import Image6 from '../images/image6.png';
import Image7 from '../images/image7.png';





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
  return (
    <>
    
<section className="max-w-full h-screen flex flex-col sm:flex-row">
  <div className="h-full w-full flex items-center justify-center">
    <div className="w-4/5 h-3/4 lg:h-3/6" data-aos="fade">
      <h1 className="text-3xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6">
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

      <p className="my-3 text-shadow-lg">
        Track moods, explore calming resources, and connect with a supportive community
      </p>

      <div className="flex space-x-4">
        <button className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
          Get started
        </button>
      </div>

      <p className="my-3 text-shadow-lg">"Healing begins with awareness."</p>
    </div>
  </div>

  <div className="h-full w-full flex items-center justify-center relative">
    <img
      src={images[currentImage]}
      alt="Slideshow"
      className="w-4/5 h-4/5 object-contain rounded-2xl shadow-lg transition-opacity duration-1000 ease-in-out"
      key={currentImage}
    />
  </div>
</section>


  <section className=" w-full  bg-gray-50">
      <div className=" w-full h-1/2 flex flex-col items-center justify-center text-center lg:h-1/6">
        <h1 className="text-3xl font-bold text-shadow-lg mb-2">Why MindfullMe?</h1>
        <p className="my-3 text-shadow-lg max-w-xl p-4">
          Discover how MindfullMe can help you on your mental health journey
        </p>
      </div>

      <div className=" w-full h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 items-center justify-center">
       {features.map((feature, index) => (
  <Box
    key={index}
    data-aos="fade"
    data-aos-delay={index * 200} // Each card zooms in with a slight delay
    sx={{
      minWidth: 230,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      },
    }}
  >
    <Card variant="outlined" sx={{ height: '100%' ,textAlign:"center" ,bgcolor:"#f5f5f5",border:"none"}} className=" ">
      <CardContent>
        <div className="flex items-center gap-2 mb-2 text-green-400 justify-center">
          {feature.icon}
          
        </div>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold', whiteSpace:"nowrap", fontSize:{md:"1.2vmax" }}}>
          {feature.subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {feature.content}
        </Typography>
      </CardContent>
    </Card>
  </Box>
))}

      </div>
    </section>


<section  className='w-full h-[60vh] flex gap-y-8 justify-center items-center flex-col bg-gray-100 '>
 
 <h1  className='text_style '>Track Your Mood Journey</h1>
 <button className='button_css2'>Try Mood Tracker</button>
</section>


<section className="w-full p-4 mt-10" data-aos="fade">
  
  <h1 className="text_style flex justify-center p-8">Resource Highlights</h1>


  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Meditation Music",
        desc: "Calming sounds to help you relax and focus.",
        img: "https://i.ytimg.com/vi/jWWuT2MchtQ/maxresdefault.jpg"
      },
      {
        title: "ASMR Playlist",
        desc: "Soothing sounds to help you sleep better.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3lUpzqbrZtnHQ7Yh8ISIQRaC85LiT-m3ZBt4sxoAaazQ-bfj"
      },
      {
        title: "Calming Visuals",
        desc: "Beautiful scenes to ease your mind.",
        img: "https://rukminim2.flixcart.com/image/850/1000/krayqa80/wallpaper/b/d/k/91-58-pp-design-226-print-panda-original-imag54gbvfuqfqqz.jpeg?q=20&crop=false"
      },
      {
        title: "Breathing Exercises",
        desc: "Guided techniques for stress relief.",
        img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSMGmEMB7QyXqIrN16krCaE2mQtMj_6j6OzemhPMjzUj1RJbd2z"
      }
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col group transition-transform"
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 bg-white flex flex-col justify-center h-40 transform transition duration-300 group-hover:-translate-y-36">
          <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
          <p className="text-gray-700 text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>


  <div className="flex justify-center mt-8">
    <button className="px-6 py-2  text-green-500 font-semibold rounded-full   transition">
      View Full Library
    </button>
  </div>
</section>






<section className="w-full bg-gray-50">
  <div className="w-full flex flex-col items-center justify-center text-center py-10">
    <h1 className="text-3xl font-bold text-shadow-lg mb-2">Community Testimonials</h1>
   
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
        className="bg-white p-6 rounded-lg shadow-lg text-shadow-md h-full flex flex-col justify-between"
        data-aos="fade"
      >
        <p className="text-gray-800 mb-4">{testimonial.text}</p>
        <div className="flex items-center gap-3 mt-4">
          <p className="font-semibold">{testimonial.author}</p>
        </div>
      </div>
    ))}
  </div>
</section>



<section className="w-full h-screen  flex flex-col items-center justify-end  bg-white  md:mt-0  " data-aos="fade" data-offset="1000">
  <h1 className="text-2xl font-bold mb-10">How It Works</h1>

  <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl mb-16 px-4">

    <div className="flex flex-col items-center text-center">
      <IoPersonAddOutline className="text-green-500 text-4xl mb-4" />
      <h2 className="font-semibold text-lg mb-1">Sign Up</h2>
      <p className="text-sm text-gray-600">Create your account in seconds</p>
    </div>

  
    <div className="hidden md:block text-green-500 text-2xl">
      <FaArrowRight />
    </div>


    <div className="flex flex-col items-center text-center">
      <AiOutlineStock className="text-green-500 text-4xl mb-4" />
      <h2 className="font-semibold text-lg mb-1">Track Your Mood</h2>
      <p className="text-sm text-gray-600">Log how you feel daily</p>
    </div>


    <div className="hidden md:block text-green-500 text-2xl">
      <FaArrowRight />
    </div>


    <div className="flex flex-col items-center text-center">
      <IoMdCloudDone className="text-green-500 text-4xl mb-4" />
      <h2 className="font-semibold text-lg mb-1">Get Suggestions</h2>
      <p className="text-sm text-gray-600">Receive personalized resources</p>
    </div>
  </div>

 
  <div className="w-full h-2/5 bg-[#9691A1] py-6 text-white text-center flex flex-col justify-center items-center gap-2" >
    <h1 className="text-lg md:text-2xl font-bold mb-4">Stay informed about mental wellness</h1>
    <form className="flex justify-center items-center gap-2 px-4">
      <input
        type="email"
        placeholder="Your email"
        className="px-4 py-2 rounded-l-full rounded-r-none  bg-white w-64 text-black focus:outline-none" 
      />
      <button className="bg-green-500 rounded-l-none -ml-2  text-white px-4 py-2 rounded-r-full">
        Subscribe
      </button>
    </form>
  </div>
</section>

    </>
  );
}

export default Home;

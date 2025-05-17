import {useEffect} from 'react'
import Button from '@mui/material/Button';
import { TypeAnimation } from 'react-type-animation';
import { LuBrain } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PiUsersThreeDuotone } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Home = () => {
  const features = [
  {
    icon: <LuBrain size={28} />,
    title: 'Cognitive Tools',
    subtitle: 'Train your brain',
    content: 'Enhance mental clarity and focus with structured exercises.',
  },
  {
    icon: <FaRegHeart size={28} />,
    title: 'Emotional Support',
    subtitle: 'Heartful care',
    content: 'Track your emotions and get guided emotional check-ins.',
  },
  {
    icon: <IoBookOutline size={28} />,
    title: 'Knowledge Base',
    subtitle: 'Grow with info',
    content: 'Access curated resources to understand mental wellness.',
  },
  {
    icon: <MdOutlinePeopleAlt size={28} />,
    title: 'Community',
    subtitle: 'You’re not alone',
    content: 'Join a safe space to share, learn, and grow together.',
  },
];

useEffect(() => {
  AOS.init({ duration: 2000 });
}, []);
  return (
    <>
    
      <section className=" max-w-full h-screen flex flex-col sm:flex-row">
        
        <div className=" h-full w-full flex items-center justify-center ">
          <div className='w-4/5  h-3/4 lg:h-3/6 ' data-aos="fade">
            
            <h1 className='text-3xl font-bold h-1/3 text-shadow-lg sm:min-h-1/6'>
              <TypeAnimation
                sequence={[
                  'Your Journey to Mental Wellness Starts Here ...',
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

            <p className='my-3 text-shadow-lg'>
              Monitor your emotions, engage with helpful tools, and find your balance.
            </p>
<div className="my-4 w-full h-1/6">
  <Button
    variant="contained"
    sx={{
      mr: '0.5rem',
      mb: { xs: 0, sm: 2 ,lg:0}, 
      mt:{sm:2,lg:0}
    }}
  >
    Start Your Journey
  </Button>
  <Button variant="outlined">Learn more</Button>
</div>

          </div>
        </div>

     <div className=" h-full w-full flex items-center justify-center relative">
  <div className=' rounded-full h-52 w-52 z-10 overflow-hidden shadow-lg shadow-blue-500/50 lg:h-64 lg:w-64  ' data-aos ="fade-up">
    <img
      className='animate-up-down h-full w-full object-cover '
      src="https://cdn.dribbble.com/userupload/23752520/file/original-f9b3884991741374306b32688589fcc4.gif"
      alt="Animated Illustration"
    />
  </div>

  <div className='absolute bottom-0 w-full h-32 sm:hidden '>
    <img
      className='h-full w-full object-cover '
      src="https://help.fanruan.com/finereport-en10.0/uploads/20201230/1609295170644784.gif"
      alt="Bottom Animated"
    />
  </div>
</div>
<div className='absolute bottom-0 w-full h-32  hidden sm:block'>
    <img
      className='h-full w-full object-cover '
      src="https://help.fanruan.com/finereport-en10.0/uploads/20201230/1609295170644784.gif"
      alt="Bottom Animated"
    />
  </div>
      </section>

  <section className=" w-full  bg-gray-50">
      <div className=" w-full h-1/2 flex flex-col items-center justify-center text-center lg:h-1/6">
        <h1 className="text-3xl font-bold text-shadow-lg mb-2">Key Features</h1>
        <p className="my-3 text-shadow-lg max-w-xl p-4">
          Discover how MindfullMe can help you on your mental health journey
        </p>
      </div>

      <div className=" w-full h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 items-center justify-center">
       {features.map((feature, index) => (
  <Box
    key={index}
    data-aos="zoom-in-up"
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
    <Card variant="outlined" sx={{ height: '100%' }} className="text-shadow-lg shadow-xl">
      <CardContent>
        <div className="flex items-center gap-2 mb-2 text-indigo-600">
          {feature.icon}
          <Typography sx={{ fontSize: 16, fontWeight: 600 }} gutterBottom>
            {feature.title}
          </Typography>
        </div>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
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


<section className="w-full bg-gray-50">
  <div className="w-full flex flex-col items-center justify-center text-center py-10">
    <h1 className="text-3xl font-bold text-shadow-lg mb-2">Hear from Our Users</h1>
    <p className="my-3 text-shadow-lg max-w-xl p-4">
      Discover how MindfullMe is helping people improve their mental wellbeing
    </p>
  </div>

  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 items-start justify-center">
   
    <div className="bg-white p-6 rounded-lg shadow-lg text-shadow-md " data-aos="slide-right">
      <div className="text-indigo-600 text-8xl flex items-center justify-center mb-2">
        <PiUsersThreeDuotone />
      </div>
      <p className="text-gray-800 mb-4">
        “MindfullMe has completely changed how I manage my anxiety. The daily check-ins and personalized
        recommendations have made a real difference in my life.”
      </p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"> 
          <img className='object-cover rounded-full items-center justify-center flex w-10 h-10' src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=" alt="" />

        </div>
        <div>
          <p className="font-semibold">Sarah J.</p>
          <p className="text-sm text-gray-500">Teacher</p>
        </div>
      </div>
    </div>


    <div className="bg-white p-6 rounded-lg shadow-lg text-shadow-md" data-aos="zoom-in-up">
      <div className="text-indigo-600  text-8xl flex items-center justify-center  mb-2">
        <PiUsersThreeDuotone />
      </div>
      <p className="text-gray-800 mb-4">
        “As someone who was skeptical about mental health apps, I'm amazed by how helpful the AI
        recommendations have been. They're surprisingly insightful and practical.”
      </p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gray-200">
          <img className='object-cover rounded-full items-center justify-center flex w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO5vE_RWSGYC-HoSM4wh1Xuw7CBJect-_0Kg&s" alt="" />

        </div>
        <div>
          <p className="font-semibold">Michael T.</p>
          <p className="text-sm text-gray-500">Software Engineer</p>
        </div>
      </div>
    </div>

    
    <div className="bg-white p-6 rounded-lg shadow-lg text-shadow-md" data-aos="slide-left">
      <div className="text-indigo-600  text-8xl flex items-center justify-center  mb-2">
        <PiUsersThreeDuotone />
      </div>
      <p className="text-gray-800 mb-4">
        “The community feature has been a game-changer for me. Connecting with others going through similar
        experiences makes me feel less alone in my journey.”
      </p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gray-200">
          <img className='object-cover rounded-full items-center justify-center flex w-10 h-10' src="https://media.istockphoto.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=" alt="" />
        </div>
        <div>
          <p className="font-semibold">Aisha P.</p>
          <p className="text-sm text-gray-500">Healthcare Worker</p>
        </div>
      </div>
    </div>
  </div>
</section>


<section className='w-full h-[90vh] mt-10'>

<div className='w-full  h-1/2 items-center justify-end flex  flex-col  z-50 absolute' data-aos="fade">
 <h1 className="text-3xl font-bold text-shadow-lg mb-2">Start Your Journey Today</h1>
        <p className="my-3 text-shadow-lg max-w-xl p-2 w-4/6">
      Join thousands of users improving their mental wellbeing with MindfullMe
        </p>

        <div className="my-4 w-full h-10/12 mx-auto    items-center justify-center flex flex-row sm:w-4/5 sm:h-1/6">
  <Button
    variant="contained"
    sx={{
      mr: '0.5rem',
      mb: { xs: 0, sm: 2 ,lg:0}, 
      mt:{sm:2,lg:0}
    }}
  >
    Start Your Journey
  </Button>
  <Button variant="outlined">Learn more</Button>
</div>


</div>
<div className='w-full  h-full flex items-center justify-center  '>
<div className='hidden sm:absolute  sm:right-0 sm:mb-72   lg:block '>

<img
  src="https://images.everydayhealth.com/images/healthy-living/fitness/stress-relief-yoga-sun-salutation.gif?sfvrsn=424917ae_3"
  className="h-72 mix-blend-multiply  "
  alt="Transparentish"
/>

</div>



    <img
      className='h-full w-full object-cover '
      src="https://help.fanruan.com/finereport-en10.0/uploads/20201230/1609295170644784.gif"
     
    />
</div>


</section>


    </>
  );
}

export default Home;

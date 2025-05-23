import React, { useState } from 'react';
import "../index.css";

import {
  FaCloudSun,
  FaLeaf,
  FaPlay,
  FaRegLightbulb,
  FaGripfire,
  FaChevronRight
} from 'react-icons/fa';
import {
  MdOutlineFavoriteBorder,
  MdOutlineMenuBook,
  MdOutlineHeadphones,
  MdOutlineBedtime,
  MdOutlineMail
} from 'react-icons/md';
import { LuSmilePlus, LuBrain } from "react-icons/lu";
import { RiFocus2Line } from "react-icons/ri";
import { IoMdHappy } from "react-icons/io";
import { MdPeopleOutline } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuBot } from "react-icons/lu";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Daily_checkin from './Daily_checkin';
import Analyze_Feedback from './Analyze_Feedback';
import Get_Logs_by_User_ID from './Get_Logs_by_User_ID';

export default function Dashboard() {
  const [showCheckinTabs, setShowCheckinTabs] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 min-h-screen font-sans bg-[#F0F0F0] w-full max-w-full">
      <div className="bg-green-100 py-4 px-2 sm:px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 rounded-lg shadow-md mb-6">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Good Morning, Krish 👋</h1>
          <span className="text-xs sm:text-sm text-gray-600">Ready to check in and care for your mind today?</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <button
            className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-full flex justify-center items-center space-x-2 shadow-md hover:bg-green-700 transition duration-300"
            onClick={() => setShowCheckinTabs((prev) => !prev)}
          >
            <LuSmilePlus />
            <span>Start Daily Check-in</span>
          </button>
          <button className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-full flex justify-center items-center space-x-2 shadow-md hover:bg-green-600 transition duration-300">
            <MdOutlineMail />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      </div>

      {/* Only show the check-in tab when toggled */}
{/* Only show the check-in tab when toggled */}
      {showCheckinTabs ? (
        <Box className="bg-white rounded-lg shadow-md mb-6 px-2 py-4 sm:px-4 sm:py-6">
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Daily Check-in Tabs"
          >
            <Tab
              label={
                <span className="text-xs sm:text-sm md:text-base font-semibold">
                  Mood
                </span>
              }
            />
            <Tab
              label={
                <span className="text-xs sm:text-sm md:text-base font-semibold">
                  Analyze Feedback
                </span>
              }
            />
            <Tab
              label={
                <span className="text-xs sm:text-sm md:text-base font-semibold">
                  Get Logs by User ID
                </span>
              }
            />
          </Tabs>
          <div className="mt-4 sm:mt-6">
            {tabValue === 0 && (
              <div>
                <Daily_checkin />
              </div>
            )}
            {tabValue === 1 && (
              <Analyze_Feedback />
            )}
            {tabValue === 2 && (
              <Get_Logs_by_User_ID />
            )}
          </div>
        </Box>
      ) : (
        <>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Your Weekly Progress */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Your Weekly Progress</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Track your mood patterns over time</p>
              <div className="h-24 sm:h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              </div>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-700 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <IoDocumentTextOutline className="text-green-500" />
                  <span>12 mood entries this week</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaGripfire className="text-orange-500" />
                  <span>5-day check-in streak</span>
                </div>
              </div>
            </div>

            {/* Today's Suggestion */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md min-w-0">
              <div className='bg-[#ebfff2] w-full flex justify-center items-start p-3 sm:p-4 rounded-md mb-3 sm:mb-4 flex-col'>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex justify-center items-center gap-2"><LuBot />Today's Suggestion</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">AI-powered recommendation for your wellbeing</p>
              </div>
              <blockquote className="italic text-gray-700 border-green-500 pl-2 sm:pl-4 py-2 text-sm sm:text-base">
                "Take a 10-minute walk outside and listen to a nature playlist. Research shows that combining light exercise with nature sounds can significantly reduce stress hormones."
              </blockquote>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300 text-sm">
                  <MdOutlineFavoriteBorder />
                  <span>Save</span>
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300 text-sm">
                  <FaRegLightbulb />
                  <span>Regenerate</span>
                </button>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2 shadow-md hover:bg-green-700 transition duration-300 text-sm">
                  <FaPlay />
                  <span>Try Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Calming Resources */}
          <div className="p-2 sm:p-4 md:p-8 mt-4 sm:mt-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 space-y-2 sm:space-y-0">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Calming Resources</h2>
              <button className="text-green-600 flex items-center space-x-1 hover:underline text-sm">
                <span>Go to Library</span>
                <FaChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[
                { icon: <MdOutlineHeadphones className="text-purple-600 text-2xl" />, title: "Lo-Fi Music", desc: "Calm beats for focus and relaxation", bg: "bg-purple-100" },
                { icon: <FaCloudSun className="text-blue-600 text-2xl" />, title: "Rain Sounds", desc: "Soothing ambient rain for sleep", bg: "bg-blue-100" },
                { icon: <FaLeaf className="text-green-600 text-2xl" />, title: "Guided Meditation", desc: "10-minute mindfulness sessions", bg: "bg-green-100" },
                { icon: <MdOutlineMenuBook className="text-yellow-600 text-2xl" />, title: "Self-help Reads", desc: "Articles and book summaries", bg: "bg-yellow-100" },
                { icon: <MdOutlineBedtime className="text-indigo-600 text-2xl" />, title: "Sleep Stories", desc: "Calming narratives for bedtime", bg: "bg-indigo-100" },
              ].map((res, i) => (
                <div key={i} className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-start text-center">
                  <div className={`${res.bg} p-3 rounded-full mb-3`}>
                    {res.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">{res.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{res.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Games & Community */}
          <div className="p-2 sm:p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4">
            {/* Games Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col min-w-0">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">Games for Mental Flexibility</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 flex-grow">
                <div className="bg-gray-50 rounded-lg shadow-sm p-3 sm:p-4 text-center flex flex-col items-center justify-between">
                  <div className="bg-blue-100 rounded-full p-3 shadow-md mb-2">
                    <LuBrain className="text-blue-600 text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg mb-1">Memory Match</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Train your memory with card matching
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-sm p-3 sm:p-4 text-center flex flex-col items-center justify-between">
                  <div className="bg-purple-100 rounded-full p-3 shadow-md mb-2">
                    <RiFocus2Line className="text-purple-600 text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg mb-1">Focus Trainer</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Improve concentration with timed exercises
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg shadow-sm p-3 sm:p-4 text-center flex flex-col items-center justify-between">
                  <div className="bg-green-100 rounded-full p-3 shadow-md mb-2">
                    <IoMdHappy className="text-green-600 text-2xl sm:text-3xl" />
                  </div>
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg mb-1">Emotion Recognition</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Practice identifying emotional expressions
                  </p>
                </div>
              </div>
              <div className='w-full flex justify-center items-center mt-4 sm:mt-6'>
                <button className="w-fit sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-lg text-sm sm:text-base">
                  Play Now
                </button>
              </div>
            </div>

            {/* Community Posts */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 min-w-0">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 flex flex-nowrap justify-start gap-2 items-center"> <MdPeopleOutline />What Others Are Talking About</h2>
              <ul className="flex-grow">
                {[
                  { title: "How do you handle social anxiety?", meta: "24 replies · Active 2 hours ago" },
                  { title: "My favorite ASMR picks", meta: "18 replies · Active 5 hours ago" },
                  { title: "Mindfulness techniques for beginners", meta: "32 replies · Active 1 day ago" },
                ].map((item, i) => (
                  <React.Fragment key={item.title}>
                    <li className="py-2 border-2 border-gray-200 rounded-md cursor-pointer px-2 hover:border-green-400 transition duration-200">
                      <p className="font-medium text-gray-700">{item.title}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{item.meta}</p>
                    </li>
                    {i < 2 && <hr className="my-2 border-gray-200" />}
                  </React.Fragment>
                ))}
              </ul>
              <div className='flex justify-center items-center '>
                <button className="mt-4 sm:mt-6 w-fit px-4 sm:px-6 py-2 sm:py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300 shadow-sm text-sm sm:text-base">
                  Join the Discussion
                </button>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className="p-2 sm:p-4 md:p-8 mt-4 sm:mt-6 bg-white rounded-lg shadow-md">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4 text-gray-800 md:text-2xl md:font-bold flex justify-start gap-2 items-center"> <FaCalendar />Upcoming Events & Reminders</h2>
            <ul>
              {[
                { title: "📅 Group Session – Mindful Monday", time: "Today at 7:00 AM" },
                { title: "📝 Journal before 10 PM tonight", time: "Today at 10:00 PM" },
                { title: "📊 Weekly Progress Review", time: "Tomorrow at 9:00 AM" },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <li className="py-2 border-2 border-gray-200 rounded-md cursor-pointer px-2 hover:border-green-400 transition duration-200">
                    <p className="font-medium text-gray-700">{item.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{item.time}</p>
                  </li>
                  {i < 2 && <hr className="my-2 border-gray-200" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
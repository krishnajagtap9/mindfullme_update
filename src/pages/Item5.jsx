import React from 'react';
import { FaRegLightbulb, FaMusic, FaCheckCircle, FaRegBookmark, FaSyncAlt } from 'react-icons/fa';
import { LuBot } from "react-icons/lu";

export default function AIWellnessGuide() {
  return (
    <div className="bg-[#F0F0F0] min-h-screen px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 tracking-wide leading-tight">
          Your AI Wellness Guide
        </h1>
        <p className="text-gray-600 mb-10 text-base sm:text-lg max-w-xl">
          Curated tips just for you to feel your best, every day.
        </p>

        {/* Today's Recommendation Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-12">
          {/* Recommendation Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#edf6fc] p-5 rounded-t-xl border-b border-blue-200">
            <div className="flex items-start justify-center font-semibold text-lg sm:text-xl flex-col">
              <div className='flex'>
                <LuBot className='text-2xl mr-4'/>
                <span> Today's Recommendation</span>
              </div>
              <span className='text-[1rem]'> Based on your recent mood patterns and goals</span>
            </div>
          </div>
          <p className="text-gray-700 mt-4 sm:mt-0 sm:max-w-3xl text-base sm:text-lg p-6">
            "Try 5 minutes of mindful breathing before bed tonight. This can help calm your mind and improve sleep quality."
          </p>

          <div className="px-5 py-4 sm:px-8">
            <a
              href="#"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
            >
              <FaMusic className="mr-2 text-lg sm:text-xl" />
              Listen to guided breathing exercise
            </a>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 border-t border-gray-200 pt-5">
              <div className="flex flex-wrap gap-4">
                <button
                  className="flex items-center px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow shadow-md text-sm sm:text-base whitespace-nowrap"
                  type="button"
                >
                  <FaCheckCircle className="mr-2 text-lg" />
                  Mark as Done
                </button>
                <button
                  className="flex items-center px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow shadow-sm text-sm sm:text-base whitespace-nowrap"
                  type="button"
                >
                  <FaRegBookmark className="mr-2 text-lg" />
                  Save
                </button>
              </div>
              <button
                className="flex items-center px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow shadow-sm text-sm sm:text-base whitespace-nowrap **self-end sm:self-auto**"
                type="button"
              >
                <FaSyncAlt className="mr-2 text-lg" />
                New Suggestion
              </button>
            </div>
          </div>
        </div>

        {/* Your Progress Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-800 leading-snug">
            Your Progress
          </h2>
          <p className="text-gray-600 mb-8 text-base sm:text-lg max-w-xl">
            Tracking your completed suggestions and their effectiveness
          </p>
          <div className="h-44 sm:h-56 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm sm:text-base select-none">
            Progress data will appear here...
          </div>
        </div>
      </div>
    </div>
  );
}
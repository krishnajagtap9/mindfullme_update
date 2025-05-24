import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaGripfire } from "react-icons/fa";

export default function Weekprogres() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md min-w-0 flex flex-col h-[400px] overflow-hidden">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Your Weekly Progress</h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Track your mood patterns over time</p>
      <div className="h-24 sm:h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
        {/* Chart or progress bar can go here */}
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
  );
}
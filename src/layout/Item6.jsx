import React from 'react';
import { FaUserCircle, FaHeart, FaComment, FaBookmark } from 'react-icons/fa';
import { LuSmilePlus } from "react-icons/lu";
import { MdOutlinePhotoCamera } from "react-icons/md";

const Item6 = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 gap-4 bg-[#F0F0F0]">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/4 flex flex-col gap-4">
        {/* Topics Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800"># Topics</h2>
          <div className="space-y-2">
            {[
              ['#Anxiety', 156],
              ['#Depression', 124],
              ['#Productivity', 98],
              ['#Mood Hacks', 87],
              ['#Self-Love', 76],
              ['#Sleep', 65],
              ['#Meditation', 54],
              ['#Stress Relief', 43],
            ].map(([topic, count], i) => (
              <div key={i} className="flex justify-between text-gray-700 text-sm hover:text-green-600 transition">
                <span>{topic}</span>
                <span className="text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">⭐ Featured Mentors</h2>
          <div className="space-y-3">
            {[
              'Dr. Emma Wilson - Clinical Psychologist',
              'Michael Chen - Meditation Coach',
              'Sarah Johnson - Community Moderator',
            ].map((mentor, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                <FaUserCircle className="text-xl text-gray-500" />
                <span>{mentor}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Center Feed */}
      <main className="w-full md:w-3/4 space-y-5 ">
        {/* Post Box */}
        <div className="  p-4 rounded-lg shadow-md bg-white">
          <textarea
            className="w-full border border-gray-300  rounded p-2 resize-none text-sm"
            rows="3"
            placeholder="What's on your mind?"
          ></textarea>
          <div className="flex justify-between mt-2 flex-wrap gap-2 ">
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition flex justify-center items-center gap-2"><LuSmilePlus/> Add Mood</button>

              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition"># Add Tag</button>
            </div>
            <button className="px-4 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition">Post</button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 text-gray-600 font-medium text-sm">
          {['All', 'Trending', 'Following', 'Recent'].map((tab) => (
            <button key={tab} className="hover:text-black transition">{tab}</button>
          ))}
        </div>

        {/* Posts Feed */}
        {[
          {
            name: 'Alex Johnson',
            time: '2 hours ago',
            text: 'Just completed a 7-day meditation challenge and I\'m feeling so much more centered! Has anyone else tried this?',
            tags: ['Meditation', 'Challenge', 'Mindfulness'],
            likes: 24,
            comments: 8,
          },
          {
            name: 'Sam Taylor',
            time: '5 hours ago',
            text: 'Struggling with anxiety lately. Any tips for managing it during work meetings?',
            tags: ['Anxiety', 'WorkStress'],
            likes: 18,
            comments: 12,
          },
        ].map((post, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold text-gray-800">{post.name}
              <span className="text-sm text-gray-500 ml-2">{post.time}</span>
            </p>
            <p className="mt-2 text-gray-700 text-sm">{post.text}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-5 text-sm text-gray-600 mt-3">
              <span className="flex items-center gap-1"><FaHeart /> {post.likes}</span>
              <span className="flex items-center gap-1"><FaComment /> {post.comments}</span>
              <span className="flex items-center gap-1"><FaBookmark /> Save </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Item6;

import React, { useState } from "react";
import {
  FaMusic,
  FaPrayingHands,
  FaFileAlt,
  FaVideo,
  FaFilePdf,
  FaHeadphones,
} from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5"; // Import the new play icon
import { IoSearch } from "react-icons/io5";


const resources = [
  {
    id: 1,
    type: "music",
    labels: [
      { text: "Popular", color: "blue" },
      { text: "Recommended", color: "purple" },
    ],
    icon: <FaMusic className="text-gray-500 w-4 h-4" />,
    duration: "30 min",
    title: "Calming Rain Sounds",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 2,
    type: "asmr", // Changed type to 'asmr' to match screenshot's 'Asmr' type
    labels: [{ text: "New", color: "green" }, { text: "Recommended", color: "purple" }],
    icon: <FaHeadphones className="text-gray-500 w-4 h-4" />,
    duration: "45 min",
    title: "Gentle Tapping ASMR",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 3,
    type: "article",
    labels: [],
    icon: <FaFileAlt className="text-gray-500 w-4 h-4" />,
    duration: "5 min read",
    title: "Understanding Anxiety",
    buttonLabel: "📖 View",
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 4,
    type: "video",
    labels: [{ text: "Popular", color: "blue" }],
    icon: <FaVideo className="text-gray-500 w-4 h-4" />,
    duration: "15 min",
    title: "Mindfulness Techniques",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 5,
    type: "pdf",
    labels: [],
    icon: <FaFilePdf className="text-gray-500 w-4 h-4" />,
    duration: "20 min read",
    title: "Self-Care Guide",
    buttonLabel: "📖 View",
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 6,
    type: "asmr",
    labels: [
      { text: "New", color: "green" },
      { text: "Recommended", color: "purple" },
    ],
    icon: <FaHeadphones className="text-gray-500 w-4 h-4" />,
    duration: "45 min",
    title: "Gentle Tapping ASMR",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 7,
    type: "music",
    labels: [{ text: "Popular", color: "blue" }],
    icon: <FaMusic className="text-gray-500 w-4 h-4" />,
    duration: "60 min",
    title: "Lo-Fi Focus Beats",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
  {
    id: 8,
    type: "meditation",
    labels: [],
    icon: <FaPrayingHands className="text-gray-500 w-4 h-4" />,
    duration: "8 min",
    title: "Breathing Exercises",
    buttonLabel: (
      <>
        <IoPlayOutline className="inline-block mr-2 text-xl" /> Play
      </>
    ),
    image:
      "https://www.imageenhan.com/static/icons/icon-placeholder.svg", // Updated image URL
  },
];

const labelColors = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
};

export default function MentalWellnessLibrary() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filterTabs = [
    { id: "all", label: "All" },
    { id: "music", label: "Music & Sounds" },
    { id: "meditation", label: "Guided Meditation" },
    { id: "article", label: "Articles" },
    { id: "video", label: "Videos" },
    { id: "pdf", label: "Self-Help PDFs" },
    { id: "asmr", label: "ASMR" },
  ];

  const filteredResources =
    filter === "all"
      ? resources
      : resources.filter((r) => r.type === filter);

  const searchedResources = filteredResources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.labels.some((label) =>
      label.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className=" min-h-screen px-6 py-10 ">
      <div className="max-w-7xl mx-auto bg-[#F0F0F0]">
        {/* Header */}
        <h1 className="md:text-4xl  text-2xl font-extrabold mb-2 text-gray-900 tracking-wide">
          Explore the Calm Within
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl text-lg">
          Discover resources to support your mental well-being journey.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 max-w-4xl">
          <input
            type="text"
            placeholder="Search by topic, type, or feeling"
            className="flex-1 border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex  gap-3   items-center justify-center whitespace-nowrap bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            onClick={() => setFilter("all")}
            aria-label="Reset Filters"
          >
           <IoSearch/> Clear Filters
          </button>
        </div>

        {/* Featured */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {resources.filter(r => r.id === 1 || r.id === 2).map((res) => (
            <div
              key={res.id}
              className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center"> {/* Added bg-gray-100 and flex for placeholder image */}
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-20 h-20 object-contain" // Adjusted size for placeholder icon
                />
                {/* Labels Overlay - Top Right */}
                <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-2 z-10">
                  {res.labels.map((label, i) => (
                    <span
                      key={i}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${labelColors[label.color]}`}
                    >
                      {label.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                  {res.icon}
                  <span className="capitalize">{res.type}</span>
                  <span className="mx-1">•</span>
                  <span>{res.duration}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 leading-tight">
                  {res.title}
                </h3>
                <button className="mt-auto w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition">
                  {res.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 max-w-4xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                filter === tab.id
                  ? "bg-green-600 text-white border-green-600 shadow-md"
                  : "text-gray-600 border-gray-300 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* All Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {searchedResources.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No resources found.
            </p>
          ) : (
            searchedResources.map((res) => (
              <div
                key={res.id}
                className="relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                data-type={res.type}
              >
                {/* Image Container */}
                <div className="relative w-full h-36 bg-gray-100 flex items-center justify-center"> {/* Added bg-gray-100 and flex for placeholder image */}
                  <img
                    src={res.image || "https://www.imageenhan.com/static/icons/icon-placeholder.svg"}
                    alt={res.title}
                    className="w-16 h-16 object-contain" // Adjusted size for placeholder icon
                  />
                  {/* Labels Overlay - Top Right */}
                  <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-2 z-10">
                    {res.labels.map((label, i) => (
                      <span
                        key={i}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${labelColors[label.color]}`}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                    {res.icon}
                    <span className="capitalize">{res.type}</span>
                    <span className="mx-1">•</span>
                    <span>{res.duration}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-900 leading-tight">
                    {res.title}
                  </h3>
                  <button className="mt-auto w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition">
                    {res.buttonLabel}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
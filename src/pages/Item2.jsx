import React, { useState } from 'react';
import { IoMdStopwatch } from "react-icons/io";

const gamesData = [
  {
    title: 'Memory Match',
    category: 'Memory',
    difficulty: 'Easy',
    duration: '3 min',
    tag: 'Daily Challenge',
    tagColor: 'green',
    description: 'Train your memory with card matching',
  },
  {
    title: 'Focus Trainer',
    category: 'Focus',
    difficulty: 'Medium',
    duration: '5 min',
    tag: 'Popular',
    tagColor: 'blue',
    description: 'Improve concentration with timed exercises',
  },
  {
    title: 'Emotion Recognition',
    category: 'Emotion',
    difficulty: 'Medium',
    duration: '4 min',
    tag: 'New',
    tagColor: 'green',
    description: 'Practice identifying emotional expressions',
  },
  {
    title: 'Breathing Zen',
    category: 'Relaxation',
    difficulty: 'Easy',
    duration: '7 min',
    description: 'Follow the pattern for deep relaxation',
  },
  {
    title: 'Word Association',
    category: 'Memory',
    difficulty: 'Hard',
    duration: '6 min',
    description: 'Connect related words to boost creativity',
    tagColor: 'purple',
  },
  {
    title: 'Pattern Recall',
    category: 'Memory',
    difficulty: 'Medium',
    duration: '4 min',
    description: 'Remember and recreate visual patterns',
  },
];

const Item2 = () => {
  const [filter, setFilter] = useState('All');

  const filteredGames = filter === 'All'
    ? gamesData
    : gamesData.filter(game => game.category === filter);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Game of the Day</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Easy</span>
          </div>
          <h2 className="text-2xl font-semibold">Memory Match</h2>
          <p className="text-sm">Train your memory with card matching</p>
          <p className="text-sm text-gray-500 flex items-center"><IoMdStopwatch />
 3 min</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Play Now</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h1 className="font-bold text-xl md:text-2xl">Game Collection</h1>
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {['All', 'Focus', 'Memory', 'Emotion', 'Relaxation'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full hover:bg-gray-300 ${
                filter === category ? 'bg-gray-400 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 space-y-2 relative">
            {game.tag && (
              <span
                className={`absolute top-2 right-2 bg-${game.tagColor}-100 text-${game.tagColor}-700 text-xs px-2 py-1 rounded-full`}
              >
                {game.tag}
              </span>
            )}
            <div className="bg-gray-200 h-36 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
            <div className="text-sm text-gray-500 flex justify-start gap-1.5 items-center"><IoMdStopwatch />
 {game.duration}</div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{game.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  game.difficulty === 'Easy'
                    ? 'bg-green-100 text-green-700'
                    : game.difficulty === 'Medium'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {game.difficulty}
              </span>
            </div>
            <p className="text-sm">{game.description}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item2;

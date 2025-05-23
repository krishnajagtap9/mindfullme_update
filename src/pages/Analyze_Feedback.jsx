import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import CircularProgress from "@mui/material/CircularProgress";

const Analyze_Feedback = () => {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) return;
    console.log("Current Clerk user_id:", user.id);
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://krish09bha-mindful-me.hf.space/logs/${user.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        setLogs([]);
      }
      setLoading(false);
    };
    fetchLogs();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        <span role="img" aria-label="analyze">📊</span> Analyze Your Feedback
      </h2>
      <p className="text-gray-500 mb-6">
        Review your daily logs and AI feedback for insights and improvement.
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress size={40} color="success" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No logs found for your account.
        </div>
      ) : (
        <div className="space-y-6">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="border border-green-200 rounded-xl p-6 shadow-md bg-gradient-to-br from-green-50 to-white hover:from-green-100 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div className="text-xs text-green-700 font-semibold flex items-center gap-2">
                  <span role="img" aria-label="calendar">📅</span>
                  {log.timestamp}
                </div>
                <div className="text-xs text-gray-500">
                  User ID: <span className="font-mono">{log.user_id}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700 mb-3">
                <div>
                  <span className="font-semibold text-black">Mood:</span> {log.mood}/10
                </div>
                <div>
                  <span className="font-semibold text-black">Energy:</span> {log.energy_level}/10
                </div>
                <div>
                  <span className="font-semibold text-black">Sleep Quality:</span> {log.sleep_quality}/10
                </div>
                <div>
                  <span className="font-semibold text-black">Diet:</span> {log.diet_level}/10
                </div>
                <div>
                  <span className="font-semibold text-black">Exercise:</span> {log.exercise_duration} min
                </div>
                <div>
                  <span className="font-semibold text-black">Anxiety:</span> {log.anxiety_level}/10
                </div>
                <div>
                  <span className="font-semibold text-black">Sleep Hours:</span> {log.sleep_hours} hrs
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-green-800">Recommended Action:</span>{" "}
                <span className="bg-green-100 px-2 py-1 rounded font-bold text-black">{log.action}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-blue-800">AI Feedback:</span>
                <div className="bg-blue-50 border border-blue-100 rounded p-3 mt-1 text-gray-800 whitespace-pre-line">
                  {log.feedback}
                </div>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-gray-700">State Array:</span>{" "}
                <span className="font-mono text-xs text-gray-600">[{log.state && log.state.join(", ")}]</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analyze_Feedback;
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, Tab, Box, CircularProgress, Tooltip } from "@mui/material";
import {
  FaCalendarAlt,
  FaClock,
  FaSmile,
  FaDumbbell,
  FaBed,
  FaLeaf,
  FaHeartbeat,
  FaChevronRight,
} from "react-icons/fa";

export default function WellnessInsights() {
  const { user } = useUser();
  const [tabIndex, setTabIndex] = useState(0);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchLogs = async () => {
        try {
          const res = await fetch(
            `https://krish09bha-mindful-me.hf.space/logs/${user.id}`
          );
          if (!res.ok) throw new Error("Failed to fetch logs");
          const data = await res.json();
          setLogs(data.logs);
        } catch (error) {
          console.error("Error fetching logs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLogs();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress size={48} thickness={5} color="success" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-1 flex items-center gap-2">
        <FaCalendarAlt className="text-green-500" /> Your Recent Wellness Insights
      </h2>
      <p className="text-base text-gray-600 mb-6">
        View your recent logs and AI recommendations to track your wellness journey.
      </p>

      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Your Wellness History
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Track your progress and view past recommendations.
            </p>
          </div>
          <Box>
            <Tabs
              value={tabIndex}
              onChange={(e, val) => setTabIndex(val)}
              indicatorColor="primary"
              textColor="primary"
              variant="standard"
              sx={{
                "& .MuiTabs-indicator": { backgroundColor: "#22c55e" },
                "& .Mui-selected": { color: "#22c55e !important" }
              }}
            >
              <Tab label="List View" />
              <Tab label="Detail View" />
            </Tabs>
          </Box>
        </div>
      </div>

      {tabIndex === 0 && (
        <div className="space-y-6">
          {logs.length === 0 && (
            <div className="text-gray-400 text-center py-8">
              No logs found for your account.
            </div>
          )}
          {logs.map((entry, index) => (
            <div
              key={index}
              className="border border-green-100 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50 hover:bg-green-50 transition"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 text-xs text-green-600 font-semibold mb-2">
                  <FaClock className="inline-block" />
                  {entry.timestamp}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaSmile className="text-yellow-500" /> Mood: <strong>{entry.mood}/10</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeartbeat className="text-pink-500" /> Energy: <strong>{entry.energy_level}/10</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed className="text-blue-500" /> Sleep Quality: <strong>{entry.sleep_quality}/10</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaLeaf className="text-green-600" /> Diet: <strong>{entry.diet_level}/10</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDumbbell className="text-purple-500" /> Exercise: <strong>{entry.exercise_duration} min</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaSmile className="text-red-400" /> Anxiety: <strong>{entry.anxiety_level}/10</strong>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed className="text-indigo-400" /> Sleep Hours: <strong>{entry.sleep_hours} hrs</strong>
                  </div>
                </div>
                <div className="text-green-700 mt-3 text-sm">
                  <span className="font-semibold">Recommended Action:</span> {entry.action}
                </div>
              </div>
              <Tooltip title="View Details" arrow>
                <div className="text-blue-600 text-base cursor-pointer mt-2 md:mt-0 font-semibold hover:underline flex items-center gap-1">
                  Details <FaChevronRight />
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      )}

      {tabIndex === 1 && (
        <div className="text-center text-gray-500 mt-6">
          <p>Detail View content goes here...</p>
        </div>
      )}
    </div>
  );
}

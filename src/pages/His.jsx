import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Tabs, Tab, Box, CircularProgress, Tooltip, Chip } from "@mui/material";
import {
  FaCalendarAlt,
  FaClock,
  FaSmile,
  FaDumbbell,
  FaBed,
  FaLeaf,
  FaHeartbeat,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

export default function WellnessInsights() {
  const { user } = useUser();
  const [tabIndex, setTabIndex] = useState(0);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // For expanding details per log
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsFeedback, setDetailsFeedback] = useState({});

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

  // Format feedback content for details (reuse from Item5.jsx if needed)
  function formatFeedbackContent(content) {
    if (!content) return "";
    let formatted = content.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold text-black">$1</strong>'
    );
    formatted = formatted.replace(
      /\*(.*?)\*/g,
      '<em>$1</em>'
    );
    formatted = formatted
      .split('\n')
      .map(line =>
        line
          .replace(/^(\d+\.)\s*/, "")
          .replace(/^•\s*/, "")
          .replace(/^\*\s*/, "")
          .replace(/^\.\s*/, "")
          .trim()
      )
      .join('\n');
    let result = "";
    const paragraphs = formatted.split("\n\n");
    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i];
      if (
        para.trim().startsWith("- ") ||
        para.trim().startsWith("* ") ||
        para.trim().match(/^(\d+\.)\s/)
      ) {
        const items = para
          .split('\n')
          .map(item =>
            item
              .replace(/^-\s*/, "")
              .replace(/^\*\s*/, "")
              .replace(/^(\d+\.)\s*/, "")
              .replace(/^•\s*/, "")
              .replace(/^\.\s*/, "")
              .trim()
          )
          .filter(Boolean);
        result += `<ul class="list-disc pl-5 space-y-2">${items
          .map(
            (item) =>
              `<li class="mb-1">${item}</li>`
          )
          .join("")}</ul>`;
      } else if (para.trim()) {
        result += `<p class="mb-2">${para.trim()}</p>`;
      }
    }
    return result;
  }

  // Fetch feedback for a specific log entry
  const handleDetailsClick = async (index, entry) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      return;
    }
    setExpandedIndex(index);
    setDetailsLoading(true);
    try {
      const response = await fetch('https://krish09bha-mindful-me.hf.space/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: entry.action }),
      });
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setDetailsFeedback(prev => ({
        ...prev,
        [index]: data.feedback || 'No feedback found.'
      }));
    } catch (err) {
      setDetailsFeedback(prev => ({
        ...prev,
        [index]: 'Sorry, something went wrong. Please try again.'
      }));
    }
    setDetailsLoading(false);
  };

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
              className={`border border-green-200 rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-green-50 to-white hover:from-green-100 transition`}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 text-xs text-green-700 font-semibold mb-2">
                  <FaClock className="inline-block" />
                  {entry.timestamp}
                  <Chip
                    label={entry.mood >= 7 ? "Great Day" : entry.mood >= 4 ? "Okay" : "Tough Day"}
                    size="small"
                    className={`ml-2 ${entry.mood >= 7 ? "bg-green-200 text-green-800" : entry.mood >= 4 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                    style={{ fontWeight: 600 }}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaSmile className="text-yellow-500" /> Mood: <span className="font-bold text-black">{entry.mood}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeartbeat className="text-pink-500" /> Energy: <span className="font-bold text-black">{entry.energy_level}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed className="text-blue-500" /> Sleep Quality: <span className="font-bold text-black">{entry.sleep_quality}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaLeaf className="text-green-600" /> Diet: <span className="font-bold text-black">{entry.diet_level}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDumbbell className="text-purple-500" /> Exercise: <span className="font-bold text-black">{entry.exercise_duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaSmile className="text-red-400" /> Anxiety: <span className="font-bold text-black">{entry.anxiety_level}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBed className="text-indigo-400" /> Sleep Hours: <span className="font-bold text-black">{entry.sleep_hours} hrs</span>
                  </div>
                </div>
                <div className="text-green-800 mt-4 text-base flex items-center gap-2">
                  <span className="font-semibold">Recommended Action:</span>
                  <span className="bg-green-100 px-2 py-1 rounded font-bold text-black">{entry.action}</span>
                </div>
                {/* Details Expandable */}
                {expandedIndex === index && (
                  <div className="mt-5 p-5 bg-blue-50 border border-blue-200 rounded-xl shadow-inner">
                    {detailsLoading ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatFeedbackContent(detailsFeedback[index]),
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <Tooltip title={expandedIndex === index ? "Hide Details" : "View Details"} arrow>
                <div
                  className={`text-blue-600 text-base cursor-pointer mt-2 md:mt-0 font-semibold hover:underline flex items-center gap-1 px-3 py-2 rounded-lg transition ${expandedIndex === index ? "bg-blue-100" : "bg-blue-50"}`}
                  onClick={() => handleDetailsClick(index, entry)}
                  style={{ userSelect: "none" }}
                >
                  {expandedIndex === index ? (
                    <>
                      Hide Details <FaChevronDown />
                    </>
                  ) : (
                    <>
                      Details <FaChevronRight />
                    </>
                  )}
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
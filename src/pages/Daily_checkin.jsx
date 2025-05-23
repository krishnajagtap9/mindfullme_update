import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function WellnessCheckIn() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    mood: 5,
    energy_level: 5,
    sleep_quality: 5,
    diet_level: 5,
    anxiety_level: 5,
    exercise_duration: 30,
    sleep_hours: 7.5
  });

  const [response, setResponse] = useState(null);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  const handleSubmit = async () => {
    if (!user || !user.id) {
      alert("User not authenticated");
      return;
    }

    const payload = {
      user_id: user.id,
      mood: Number(formData.mood),
      energy_level: Number(formData.energy_level),
      sleep_quality: Number(formData.sleep_quality),
      diet_level: Number(formData.diet_level),
      anxiety_level: Number(formData.anxiety_level),
      exercise_duration: parseInt(formData.exercise_duration, 10),
      sleep_hours: Number(formData.sleep_hours)
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch("https://krish09bha-mindful-me.hf.space/daily-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server returned ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit log. " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Daily Wellness Check-In</h2>
      <p className="text-gray-500">Track your mental and physical wellbeing to receive personalized recommendations</p>

      {[
        { label: "Mood", id: "mood" },
        { label: "Energy Level", id: "energy_level" },
        { label: "Sleep Quality", id: "sleep_quality" },
        { label: "Diet Quality", id: "diet_level" },
        { label: "Anxiety Level", id: "anxiety_level" }
      ].map(({ label, id }) => (
        <div key={id}>
          <label className="block text-sm font-medium text-gray-700">{label} (1–10)</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={formData[id]}
            onChange={(e) => handleChange(id, e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Low</span><span>High</span>
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">Exercise Duration (minutes)</label>
        <input
          type="range"
          min="0"
          max="120"
          step="5"
          value={formData.exercise_duration}
          onChange={(e) => handleChange("exercise_duration", e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0 min</span><span>120 min</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sleep Hours</label>
        <input
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={formData.sleep_hours}
          onChange={(e) => handleChange("sleep_hours", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
      >
        Submit Daily Log
      </button>

      {response && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
          <p><strong>Recommendation:</strong> {response.action}</p>
          <p><strong>Feedback:</strong> {response.feedback}</p>
        </div>
      )}
    </div>
  );
}

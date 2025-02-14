import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const { data, error } = await supabase
          .from("timetable")
          .select("*")
          .order("day", { ascending: true });

        if (error) {
          console.error("Error fetching timetable:", error);
        } else {
          setTimetable(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div className="p-5 dark:bg-gray-900 dark:text-white min-h-screen">
      <Typography variant="h5" className="mb-4">Timetable</Typography>
      
      {loading ? (
        <div className="text-center dark:text-gray-300">Loading...</div>
      ) : (
        <table className="w-full text-left border-collapse dark:bg-gray-800 dark:border-gray-700">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="p-2 dark:text-white">Day</th>
              <th className="p-2 dark:text-white">Time Slot</th>
              <th className="p-2 dark:text-white">Subject</th>
              <th className="p-2 dark:text-white">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {timetable.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-2 text-center dark:text-gray-300">No timetable available</td>
              </tr>
            ) : (
              timetable.map((entry) => (
                <tr key={entry.id} className="border-b dark:border-gray-600">
                  <td className="p-2 dark:text-gray-300">{entry.day}</td>
                  <td className="p-2 dark:text-gray-300">{entry.time_slot}</td>
                  <td className="p-2 dark:text-gray-300">{entry.subject}</td>
                  <td className="p-2 dark:text-gray-300">{entry.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

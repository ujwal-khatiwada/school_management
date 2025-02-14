import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { supabase } from "../supabaseClient";

const dashboardItems = [
  { title: "Fees", description: "Manage and track your fee payments", icon: <AccountBalanceWalletIcon fontSize="large" className="dark:text-white" /> },
  { title: "Attendance", description: "View your attendance record", icon: <CheckCircleIcon fontSize="large" className="dark:text-white" /> },
  { title: "Marks", description: "Check your academic performance", icon: <TrendingUpIcon fontSize="large" className="dark:text-white" /> },
  { title: "Timetable", description: "View your current timetable", icon: <ScheduleIcon fontSize="large" className="dark:text-white" /> },
];

const Dashboard = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Grid container justifyContent="space-between" alignItems="center" className="mb-5">
        <Typography variant="h4" fontWeight="bold" className="dark:text-white">Student Dashboard</Typography>
      </Grid>
      
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="text-center p-5 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg">
              <CardContent>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" className="mt-2 dark:text-white">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className="mt-8">
        <Typography variant="h5" className="dark:text-white mb-4">Timetable</Typography>
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
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, Paper } from "@mui/material";
import { supabase } from "../supabaseClient"; // Import Supabase client

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance from Supabase
  useEffect(() => {
    const fetchAttendance = async () => {
      const { data, error } = await supabase.from("attendance").select("*");
      if (error) {
        console.error("Error fetching attendance:", error);
      } else {
        setAttendanceData(data);
      }
    };

    fetchAttendance();
  }, []);

  // Function to update attendance in Supabase
  const updateAttendance = async (id, newStatus) => {
    const { error } = await supabase
      .from("attendance")
      .update({ status: newStatus })
      .match({ id });

    if (error) {
      console.error("Error updating attendance:", error);
    } else {
      setAttendanceData((prevData) =>
        prevData.map((entry) =>
          entry.id === id ? { ...entry, status: newStatus } : entry
        )
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, color: "text.primary" }} className="dark:bg-gray-900 dark:text-white p-4 rounded-lg">
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }} className="dark:text-white">
        Welcome, Student
      </Typography>

      <Typography variant="h6" className="dark:text-gray-300">Class: 12 2025</Typography>
      <Typography variant="h6" className="dark:text-gray-300">Number of Classes Conducted: {attendanceData.length}</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {attendanceData.map((entry) => (
          <Grid item xs={3} sm={2} key={entry.id}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
              className="dark:bg-gray-800 dark:border-gray-700"
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }} className="dark:text-gray-200">
                {entry.student_id}
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => updateAttendance(entry.id, entry.status === "P" ? "X" : "P")}
                sx={{
                  mt: 1,
                  bgcolor:
                    entry.status === "P" ? "green" :
                    entry.status === "X" ? "red" : "gray",
                  "&:hover": {
                    bgcolor:
                      entry.status === "P" ? "darkgreen" :
                      entry.status === "X" ? "darkred" : "darkgray",
                  },
                }}
                className="dark:bg-green-500 dark:hover:bg-green-700 dark:text-white"
              >
                {entry.status}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Attendance;

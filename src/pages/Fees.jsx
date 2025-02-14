import React, { useState, useEffect } from "react";
import { TextField, Grid, Container, Typography, Paper } from "@mui/material";
import { supabase } from "../supabaseClient";

const Fees = () => {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const { data, error } = await supabase
          .from("fees")
          .select("*")
          .order("id", { ascending: true }); // Fetch all fees data ordered by ID

        if (error) {
          console.error("Error fetching fee data:", error);
        } else {
          setFeeData(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) return <p className="text-center dark:text-black-300">Loading...</p>;
  if (feeData.length === 0) return <p className="text-center dark:text-gray-300">No data available</p>;

  return (
    <div className="min-h-screen p-5 dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <Container maxWidth="md">
        <Paper elevation={8} className="p-8 rounded-2xl dark:bg-gray-800 dark:border dark:border-gray-700 shadow-xl">
          <Typography variant="h4" className="text-center font-extrabold dark:text-white mb-6">
            Student Fee Details
          </Typography>
          {feeData.map((student) => (
            <Paper key={student.id} className="p-5 my-4 dark:bg-gray-700 rounded-xl shadow-md">
              <Grid container spacing={4}>
                {Object.entries(student).map(([key, value]) => (
                  key !== "id" && (
                    <Grid item xs={12} sm={6} key={key}>
                      <TextField
                        fullWidth
                        label={key.replace(/_/g, " ").toUpperCase()}
                        value={value}
                        disabled
                        className="dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg shadow-md"
                        InputLabelProps={{ className: "dark:text-gray-300" }}
                        InputProps={{ className: "dark:text-white text-lg font-semibold" }}
                      />
                    </Grid>
                  )
                ))}
              </Grid>
            </Paper>
          ))}
        </Paper>
      </Container>
    </div>
  );
};

export default Fees;

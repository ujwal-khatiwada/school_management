import React, { useState } from "react";
import { TextField, Grid, Container, Typography, Paper } from "@mui/material";

const Fees = () => {
  // Student's Fee Data
  const [formData] = useState({
    enrollmentNumber: "26574",
    studentName: "Softpedia",
    courseCode: "254",
    courseName: "Softpedia",
    date: "2014-08-29", // YYYY-MM-DD format
    semester: "IVth Sem",
    paidFee: "220",
    totalFee: "540",
    balanceFee: "320",
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}>
          Student Fee Details
        </Typography>
        <Grid container spacing={2}>
          {/** Map through each field and style them */}
          {Object.entries(formData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.replace(/([A-Z])/g, " $1").trim()} // Format label text
                value={value}
                disabled
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#e3f2fd", // Light blue background
                    borderRadius: 1,
                    color: "#000", // Black text
                    fontWeight: "bold", // Bold text
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                    color: "#1565c0",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#1976d2" },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Fees;

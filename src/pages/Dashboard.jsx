
import React from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const dashboardItems = [
  { title: "Fees", description: "Manage and track your fee payments", icon: <AccountBalanceWalletIcon fontSize="large" color="primary" /> },
  { title: "Attendance", description: "View your attendance record", icon: <CheckCircleIcon fontSize="large" color="primary" /> },
  { title: "Marks", description: "Check your academic performance", icon: <TrendingUpIcon fontSize="large" color="primary" /> },
  { title: "Timetable", description: "View your current timetable", icon: <ScheduleIcon fontSize="large" color="primary" /> },
];

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: "20px" }}>
        <Typography variant="h4" fontWeight="bold">Student Dashboard</Typography>
      </Grid>
      
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ textAlign: "center", padding: "20px", borderRadius: "12px" }}>
              <CardContent>
                {item.icon}
                <Typography variant="h6" fontWeight="bold" style={{ marginTop: "10px" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;

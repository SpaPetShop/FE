import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminDashboardAPI from '../../utils/AdminDashboardAPI';

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [year, setYear] = useState(2024);  // Default year
  const [month, setMonth] = useState(8);   // Default month

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const params = { year, month };
        const response :any = await AdminDashboardAPI.getAllCountOderInDay(params);
        
        // Check the structure of the received data
        console.log('API Response:', response.dailyStatistics
        );

        const dailyStatistics = response.dailyStatistics;

        // Transform the data for the chart
        const transformedData = dailyStatistics.map((item: any) => ({
          date: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          revenue: item.totalRevenue,
        }));

        setRevenueData(transformedData);
      } catch (error) {
        console.error('Failed to fetch revenue data:', error);
      }
    };

    fetchRevenueData();
  }, [year, month]);  // Re-fetch data when year or month changes

  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Daily Revenue
      </Typography>
      
      {/* Year and Month Selectors */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value as number)}
            label="Year"
          >
            {[2023, 2024, 2025].map((yr) => (
              <MenuItem key={yr} value={yr}>{yr}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value as number)}
            label="Month"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((mth) => (
              <MenuItem key={mth} value={mth}>{mth}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;

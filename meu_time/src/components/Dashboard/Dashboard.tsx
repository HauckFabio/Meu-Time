import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardData {
  [key: string]: {
    total: number;
    percentage: string;
  };
}

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([range, { total }]) => ({
    range,
    total,
  }));

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300} >
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}   >
            <XAxis dataKey="range"  />
            <YAxis  />
            <Tooltip  />
            <Bar dataKey="total" fill="#4285f4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  
    </div>
  );
};

export default Dashboard;
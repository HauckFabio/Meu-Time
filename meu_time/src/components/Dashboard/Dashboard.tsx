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
      
{/*       <div className="dashboard-grid">
     {Object.entries(data).map(([range, { total, percentage }]) => (
          <div className="dashboard-card" key={range}>
            <h2 className="card-title">{range}</h2>
            <p className="card-info">Total: {total}</p>
            <p className="card-info">Percentage: {percentage}</p>
          </div>
        ))}
      </div> */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-container">
    {/*   <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default Dashboard;
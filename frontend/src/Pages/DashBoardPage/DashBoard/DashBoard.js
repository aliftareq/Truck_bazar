import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const DashBoard = () => {
  const stats = useLoaderData();

  if (!stats) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const barData = [
    { name: "Products", value: stats?.totalProducts || 0 },
    { name: "Sold", value: stats?.soldProducts || 0 },
    { name: "Reported", value: stats?.reportedProducts || 0 },
    { name: "Users", value: stats?.totalUsers || 0 },
    { name: "Verified", value: stats?.verifiedUsers || 0 },
    { name: "Bookings", value: stats?.totalBookings || 0 },
  ];

  const pieData = [
    { name: "Sellers", value: stats?.totalSellers || 0 },
    { name: "Buyers", value: stats?.totalBuyers || 0 },
    { name: "Admins", value: stats?.totalAdmins || 0 },
  ];

  const COLORS = ["#f59e0b", "#10b981", "#3b82f6"];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-yellow-400 mb-8">
          Welcome to Your Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.totalProducts || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Sold Products</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.soldProducts || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-400 to-rose-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Reported Products</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.reportedProducts || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-indigo-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{stats?.totalUsers || 0}</p>
          </div>

          <div className="bg-gradient-to-r from-violet-400 to-purple-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Verified Users</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.verifiedUsers || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-400 to-sky-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Total Sellers</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.totalSellers || 0}
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-400 to-fuchsia-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Total Buyers</h2>
            <p className="text-3xl font-bold mt-2">{stats?.totalBuyers || 0}</p>
          </div>

          <div className="bg-gradient-to-r from-teal-400 to-green-600 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2">
              {stats?.totalBookings || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              Dashboard Statistics
            </h2>
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">
              User Role Distribution
            </h2>
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

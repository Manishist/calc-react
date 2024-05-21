import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface DashboardProps {
    isAdmin: string;
    name: string;
    showEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ isAdmin, name, showEmail }) => {
    const [userData, setUserData] = useState<any>([]);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_email: showEmail }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user info");
            }
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        if (isAdmin !== "false") {
            fetchUserInfo();
        }
    }, [name]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

    const totalConsumptionData = userData.map((user: any) => ({
        name: user.name,
        value: user.total_time_consumption,
    }));

    const totalDailyConsumptionData = userData.map((user: any) => ({
        name: user.name,
        value: user.total_time_today,
    }));

    const barGraphData = userData.map((user: any) => ({
        name: user.name,
        totalConsumption: user.total_time_consumption,
        dailyConsumption: user.total_time_today,
    }));

    return (
        <div>
            {isAdmin === "false" ? (
                "You do not have access to this page"
            ) : (
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ backgroundColor: "wheat", padding: "20px", flex: "1 1 300px" }}>
                        <h3>Total Consumption of All Users</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={totalConsumptionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={40}
                                    fill="#8884d8"
                                    label
                                >
                                    {totalConsumptionData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ backgroundColor: "wheat", padding: "20px", flex: "1 1 300px" }}>
                        <h3>Total Daily Consumption of All Users</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={totalDailyConsumptionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={40}
                                    fill="#8884d8"
                                    label
                                >
                                    {totalDailyConsumptionData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ backgroundColor: "wheat", padding: "20px", flex: "1 1 600px" }}>
                        <h3>Total vs Daily Consumption of All Users</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={barGraphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="totalConsumption" fill="#8884d8" name="Total Consumption" />
                                <Bar dataKey="dailyConsumption" fill="#82ca9d" name="Daily Consumption" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ backgroundColor: "wheat", padding: "20px", flex: "1 1 300px" }}>
                        <h3>Logged In Days in Last 7 Days</h3>
                        <ul>
                            {userData.map((user: any, index: number) => (
                                <li key={index}>
                                    {user.name}: {user.logged_in_last_7_days}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

import React from "react";
import { ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Legend, Tooltip, BarChart, Bar } from "recharts";

const Dashboard: React.FC<{ isAdmin: string }> = ({ isAdmin }) => {

    const data = [
        { name: "u_1", value: 2000, points: 4000 },
        { name: "u_2", value: 500, points: 2000 },
        { name: "u_3", value: 3000, points: 500 },
        { name: "u_4", value: 5000, points: 3000 },
        { name: "u_5", value: 1000, points: 4000 },
        { name: "u_6", value: 4000, points: 1000 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

    return (
        <div>
            {isAdmin === "false" ? (
                "You do not have access to this page"
            ) : (
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ backgroundColor: "white", padding: "20px", flex: "1 1 300px" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" interval={"preserveStartEnd"} />
                                <YAxis />
                                <Legend />
                                <Tooltip contentStyle={{ backgroundColor: "pink" }} />
                                <Line type="monotone" dataKey="value" stroke="red" />
                                <Line type="monotone" dataKey="points" stroke="black" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div style={{ backgroundColor: "white", padding: "20px", flex: "1 1 300px" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" interval={"preserveStartEnd"} />
                                <YAxis />
                                <Legend />
                                <Tooltip contentStyle={{ backgroundColor: "pink" }} />
                                <Bar dataKey="value" fill="red" />
                                <Bar dataKey="points" fill="black" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ backgroundColor: "white", padding: "20px", flex: "1 1 300px" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie 
                                    data={data} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    innerRadius={40} 
                                    fill="#8884d8" 
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;

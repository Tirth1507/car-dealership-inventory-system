import { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import "../styles/Dashboard.css";

import { getAllCars } from "../services/carService";

const STATUS_COLORS = {
    Available: "#4B006E",
    Sold: "#FF8700",
    Reserved: "#B892C9",
};

const BAR_COLORS = ["#4B006E", "#FF8700", "#7A3E9D", "#FFA94D", "#9C4FBF", "#D98C3D"];

function Dashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        availableCars: 0,
        soldCars: 0,
        totalValue: 0,
    });

    const [statusData, setStatusData] = useState([]);
    const [makeData, setMakeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const cars = await getAllCars();

            const totalCars = cars.length;
            const availableCars = cars.filter((car) => car.status === "Available").length;
            const soldCars = cars.filter((car) => car.status === "Sold").length;
            const reservedCars = cars.filter((car) => car.status === "Reserved").length;
            const totalValue = cars.reduce((sum, car) => sum + Number(car.price), 0);

            setStats({ totalCars, availableCars, soldCars, totalValue });

            setStatusData(
                [
                    { name: "Available", value: availableCars },
                    { name: "Sold", value: soldCars },
                    { name: "Reserved", value: reservedCars },
                ].filter((s) => s.value > 0)
            );

            const makeCounts = cars.reduce((acc, car) => {
                acc[car.make] = (acc[car.make] || 0) + 1;
                return acc;
            }, {});

            const topMakes = Object.entries(makeCounts)
                .map(([make, count]) => ({ make, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 6);

            setMakeData(topMakes);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>🚗 Dashboard</h1>
                <p>Welcome to Car Dealership Inventory System</p>
            </div>

            <div className="cards">
                <div className="card card-purple" style={{ animationDelay: "0ms" }}>
                    <div className="card-icon">🚘</div>
                    <div>
                        <h3>Total Cars</h3>
                        <h2>{stats.totalCars}</h2>
                    </div>
                </div>

                <div className="card card-green" style={{ animationDelay: "80ms" }}>
                    <div className="card-icon">✅</div>
                    <div>
                        <h3>Available Cars</h3>
                        <h2>{stats.availableCars}</h2>
                    </div>
                </div>

                {/* <div className="card card-orange" style={{ animationDelay: "160ms" }}>
                    <div className="card-icon">🏷️</div>
                    <div>
                        <h3>Sold Cars</h3>
                        <h2>{stats.soldCars}</h2>
                    </div>
                </div> */}

                <div className="card card-purple" style={{ animationDelay: "240ms" }}>
                    <div className="card-icon">💰</div>
                    <div>
                        <h3>Total Value</h3>
                        <h2>₹{stats.totalValue.toLocaleString("en-IN")}</h2>
                    </div>
                </div>
            </div>

            {!loading && stats.totalCars > 0 && (
                <div className="charts-row">
                    <div className="chart-card">
                        <h3 className="chart-title">Inventory Status</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={3}
                                >
                                    {statusData.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={STATUS_COLORS[entry.name] || "#999"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="legend">
                            {statusData.map((entry) => (
                                <div className="legend-item" key={entry.name}>
                                    <span
                                        className="legend-dot"
                                        style={{ background: STATUS_COLORS[entry.name] || "#999" }}
                                    />
                                    {entry.name} ({entry.value})
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3 className="chart-title">Top Makes in Inventory</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={makeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#EFEFF4" vertical={false} />
                                <XAxis
                                    dataKey="make"
                                    tick={{ fill: "#666666", fontSize: 12 }}
                                    axisLine={{ stroke: "#EFEFF4" }}
                                    tickLine={false}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fill: "#666666", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip cursor={{ fill: "#F5F0FA" }} />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                    {makeData.map((entry, index) => (
                                        <Cell
                                            key={entry.make}
                                            fill={BAR_COLORS[index % BAR_COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {!loading && stats.totalCars === 0 && (
                <div className="empty-dashboard">
                    <p>No vehicles in inventory yet.</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
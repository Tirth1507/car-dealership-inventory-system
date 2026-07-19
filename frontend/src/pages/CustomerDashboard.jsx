import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllCars } from "../services/carService";
import "../styles/Dashboard.css";

function CustomerDashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        availableCars: 0,
        premiumCars: 0,
        electricCars: 0,
        startingPrice: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const cars = await getAllCars();

            const availableCars = cars.filter(
                (car) => car.status === "Available"
            ).length;

            const premiumCars = cars.filter(
                (car) =>
                    car.category &&
                    car.category.toLowerCase() === "luxury"
            ).length;

            const electricCars = cars.filter(
                (car) =>
                    car.fuel_type &&
                    car.fuel_type.toLowerCase() === "electric"
            ).length;

            const startingPrice =
                cars.length > 0
                    ? Math.min(...cars.map((car) => Number(car.price)))
                    : 0;

            setStats({
                availableCars,
                premiumCars,
                electricCars,
                startingPrice,
            });

        } catch (error) {

            console.error("Failed to fetch dashboard data:", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard-container">

            <div className="customer-hero">

                <div>

                    <h1>
                        🚗 Welcome Back, {user?.first_name}!
                    </h1>

                    <p>
                        Find your dream car from our premium collection.
                    </p>

                    <button
                        className="browse-btn"
                        onClick={() => navigate("/browse-cars")}
                    >
                        Browse Cars
                    </button>

                </div>

            </div>

            <div className="cards">

                <div className="card card-purple">

                    <div className="card-icon">
                        🚘
                    </div>

                    <div>

                        <h3>Available Cars</h3>

                        <h2>
                            {loading ? "..." : stats.availableCars}
                        </h2>

                    </div>

                </div>

                <div className="card card-green">

                    <div className="card-icon">
                        ⭐
                    </div>

                    <div>

                        <h3>Premium Cars</h3>

                        <h2>
                            {loading ? "..." : stats.premiumCars}
                        </h2>

                    </div>

                </div>

                <div className="card card-orange">

                    <div className="card-icon">
                        ⚡
                    </div>

                    <div>

                        <h3>Electric Cars</h3>

                        <h2>
                            {loading ? "..." : stats.electricCars}
                        </h2>

                    </div>

                </div>

                <div className="card card-purple">

                    <div className="card-icon">
                        💰
                    </div>

                    <div>

                        <h3>Starting Price</h3>

                        <h2>

                            {loading
                                ? "..."
                                : `₹${stats.startingPrice.toLocaleString("en-IN")}`}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="offer-card">

                <div>

                    <h2>
                        🎉 Special Offer
                    </h2>

                    <p>
                        Get up to <strong>₹50,000 Exchange Bonus</strong> on selected vehicles.
                    </p>

                </div>

                <button
                    className="browse-btn"
                    onClick={() => navigate("/browse-cars")}
                >
                    Explore Cars
                </button>

            </div>

            <div className="category-section">

                <h2>Browse by Category</h2>

                <div className="category-grid">

                    <div className="category-card">

                        🚙

                        <span>SUV</span>

                    </div>

                    <div className="category-card">

                        🚗

                        <span>Sedan</span>

                    </div>

                    <div className="category-card">

                        ⚡

                        <span>Electric</span>

                    </div>

                    <div className="category-card">

                        💎

                        <span>Luxury</span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CustomerDashboard;
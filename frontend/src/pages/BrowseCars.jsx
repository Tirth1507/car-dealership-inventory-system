import { useEffect, useState } from "react";

import {
    getAllCars,
    purchaseCar
} from "../services/carService";
import CarCard from "../components/CarCard";

import "../styles/BrowseCars.css";

function BrowseCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [fuelFilter, setFuelFilter] = useState("All");
    const [transmissionFilter, setTransmissionFilter] = useState("All");

    useEffect(() => {
    fetchCars();
}, []);

const fetchCars = async () => {
    try {
        const data = await getAllCars();
        setCars(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

const handlePurchase = async (carId) => {

    try {

        await purchaseCar(carId);

        alert("Car purchased successfully!");

        fetchCars();

    } catch (error) {

        alert(
            error.response?.data?.detail ||
            "Purchase failed."
        );

    }

};

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            `${car.make} ${car.model}`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesFuel =
            fuelFilter === "All" || car.fuel_type === fuelFilter;

        const matchesTransmission =
            transmissionFilter === "All" || car.transmission === transmissionFilter;

        return matchesSearch && matchesFuel && matchesTransmission;
    });

    if (loading) {
        return (
            <div className="browse-container">
                <p className="browse-loading">Loading cars...</p>
            </div>
        );
    }

    return (
        <div className="browse-container">
            <div className="browse-header">
                <h1 className="browse-title">Browse Cars</h1>
                <p className="browse-subtitle">
                    {filteredCars.length} {filteredCars.length === 1 ? "vehicle" : "vehicles"} available
                </p>
            </div>

            <div className="filter-section">
                <input
                    type="text"
                    className="filter-search"
                    placeholder="Search by make or model..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="filter-select"
                    value={fuelFilter}
                    onChange={(e) => setFuelFilter(e.target.value)}
                >
                    <option value="All">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                <select
                    className="filter-select"
                    value={transmissionFilter}
                    onChange={(e) => setTransmissionFilter(e.target.value)}
                >
                    <option value="All">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>
            </div>

            {filteredCars.length === 0 ? (
                <div className="browse-empty">
                    <p>No cars found matching your filters.</p>
                </div>
            ) : (
                <div className="car-grid">
                    {filteredCars.map((car) => (
                       <CarCard
                        key={car.id}
                        car={car}
                        onPurchase={handlePurchase}
                    />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BrowseCars;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Cars.css";
import {
    getAllCars,
    deleteCar,
} from "../services/carService";

function Cars() {

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {

        try {

            setLoading(true);

            const data = await getAllCars();

            setCars(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this car?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteCar(id);

            fetchCars();

        } catch (error) {

            console.error(error);

            alert("Failed to delete car.");

        }

    };

    const getStatusClass = (status) => {

        const normalized = (status || "").toLowerCase();

        if (
            normalized === "sold" ||
            normalized === "out of stock"
        ) {
            return "status-sold";
        }

        if (normalized === "reserved") {
            return "status-reserved";
        }

        return "status-available";

    };

    return (

        <div className="cars-container">

            <div className="cars-header">

                <div>
                    <h1>Cars</h1>
                    <p>
                        {cars.length}{" "}
                        {cars.length === 1
                            ? "vehicle"
                            : "vehicles"}{" "}
                        in inventory
                    </p>
                </div>

                <button
                    className="add-car-btn"
                    onClick={() => navigate("/cars/add")}
                >
                    + Add Car
                </button>

            </div>

            <div className="table-wrapper">

                <table className="cars-table">

                    <thead>

                        <tr>
                            <th></th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Fuel</th>
                            <th>Transmission</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td
                                    colSpan="10"
                                    className="empty-state"
                                >
                                    Loading cars...
                                </td>
                            </tr>

                        ) : cars.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="10"
                                    className="empty-state"
                                >
                                    No cars found.
                                </td>
                            </tr>

                        ) : (

                            cars.map((car) => (

                                <tr key={car.id}>

                                    <td className="car-icon-cell">
                                        🚗
                                    </td>

                                    <td className="cell-strong">
                                        {car.make}
                                    </td>

                                    <td>{car.model}</td>

                                    <td>{car.year}</td>

                                    <td className="cell-strong">
                                        ₹
                                        {Number(
                                            car.price
                                        ).toLocaleString("en-IN")}
                                    </td>

                                    <td>{car.fuel_type}</td>

                                    <td>{car.transmission}</td>

                                    <td className="cell-strong">
                                        {car.quantity}{" "}
                                        {car.quantity === 1
                                            ? "car"
                                            : "cars"}
                                    </td>

                                    <td>
                                        <span
                                            className={`status-badge ${getStatusClass(
                                                car.status
                                            )}`}
                                        >
                                            {car.status}
                                        </span>
                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/cars/edit/${car.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(car.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Cars;
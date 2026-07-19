import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Cars.css";
import {
    getAllCars,
    deleteCar,
    restockCar,
} from "../services/carService";

function Cars() {

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showRestockModal, setShowRestockModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [restockQuantity, setRestockQuantity] = useState("");

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

            alert("Car deleted successfully!");

            fetchCars();

        } catch (error) {

            console.error(error);

            alert("Failed to delete car.");

        }

    };

    const handleRestock = async (id) => {

        

        if (
            quantity === null ||
            quantity.trim() === ""
        ) {
            return;
        }

        const qty = Number(quantity);

        if (!Number.isInteger(qty) || qty <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        try {

            await restockCar(id, qty);

            alert("Car restocked successfully!");

            fetchCars();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to restock car."
            );

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

    const submitRestock = async () => {

    const qty = Number(restockQuantity);

    if (!Number.isInteger(qty) || qty <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    try {

        await restockCar(selectedCarId, qty);

        alert("Inventory updated successfully!");

        setShowRestockModal(false);

        fetchCars();

    } catch (error) {

        alert(
            error.response?.data?.detail ||
            "Failed to restock."
        );

    }

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
                            <th>Category</th>
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
                                    colSpan="11"
                                    className="empty-state"
                                >
                                    Loading cars...
                                </td>
                            </tr>

                        ) : cars.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="11"
                                    className="empty-state"
                                >
                                    No cars found.
                                </td>
                            </tr>

                        ) : (

                            cars.map((car) => (

                                <tr key={car.id}>

                                    <td className="car-icon-cell">

                                        {car.image_url ? (

                                            <img
                                                src={`http://localhost:8000/uploads/${car.image_url}`}
                                                alt={`${car.make} ${car.model}`}
                                                className="car-table-image"
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />

                                        ) : (

                                            <div className="no-image">
                                                No Image
                                            </div>

                                        )}

                                    </td>

                                    <td className="cell-strong">
                                        {car.make}
                                    </td>

                                    <td>{car.model}</td>

                                    <td>{car.category}</td>

                                    <td>{car.year}</td>

                                    <td className="cell-strong">
                                        ₹
                                        {Number(car.price).toLocaleString(
                                            "en-IN"
                                        )}
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
                                                className="restock-btn"
                                                onClick={() => {
                                                    setSelectedCarId(car.id);
                                                    setRestockQuantity("");
                                                    setShowRestockModal(true);
                                                }}
                                            >
                                                Restock
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
            {showRestockModal && (

<div className="modal-overlay">

    <div className="restock-modal">

        <h2>Restock Inventory</h2>

        <p>Enter quantity to add</p>

        <input
            type="number"
            value={restockQuantity}
            onChange={(e)=>setRestockQuantity(e.target.value)}
            min="1"
        />

        <div className="modal-buttons">

            <button
                className="cancel-btn"
                onClick={()=>setShowRestockModal(false)}
            >
                Cancel
            </button>

            <button
                className="confirm-btn"
                onClick={submitRestock}
            >
                Restock
            </button>

        </div>

    </div>

</div>

)}

        </div>

    );

}

export default Cars;
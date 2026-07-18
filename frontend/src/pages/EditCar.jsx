import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/AddCar.css";
import CarForm from "../components/CarForm";
import { getCarById, updateCar } from "../services/carService";

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        color: "",
        fuel_type: "",
        transmission: "",
        mileage: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCar();
    }, []);

    const fetchCar = async () => {
        try {
            setLoading(true);
            setError(null);

            const car = await getCarById(id);

            setFormData({
                make: car.make,
                model: car.model,
                year: car.year,
                price: car.price,
                color: car.color,
                fuel_type: car.fuel_type,
                transmission: car.transmission,
                mileage: car.mileage,
            });

        } catch (error) {
            console.error(error);
            setError("Unable to load car details.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            await updateCar(id, {
                ...formData,
                year: Number(formData.year),
                price: Number(formData.price),
                mileage: Number(formData.mileage),
            });

            navigate("/cars");

        } catch (error) {
            console.error(error);
            alert("Failed to update car.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="add-car-page">
                <div className="form-state-message">Loading car details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="add-car-page">
                <div className="form-state-message form-state-error">
                    {error}
                    <button className="retry-btn" onClick={fetchCar}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="add-car-page">
            <div className="add-car-header">
                <h1>Edit Car</h1>
                <p>Update the vehicle details below</p>
            </div>

            <CarForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText={submitting ? "Updating..." : "Update Car"}
                onCancel={() => navigate("/cars")}
            />
        </div>
    );
}

export default EditCar;
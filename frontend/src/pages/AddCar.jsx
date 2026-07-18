import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/AddCar.css";
import { createCar } from "../services/carService";
import CarForm from "../components/CarForm";

function AddCar() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

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

            await createCar({
                ...formData,
                year: Number(formData.year),
                price: Number(formData.price),
                mileage: Number(formData.mileage),
            });

            navigate("/cars");

        } catch (error) {
            console.error(error);
            alert("Failed to add car.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add-car-page">
            <div className="add-car-header">
                <h1>Add New Car</h1>
                <p>Enter the vehicle details below to add it to inventory</p>
            </div>

            <CarForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText={submitting ? "Saving..." : "Add New Car"}
                onCancel={() => navigate("/cars")}
            />
        </div>
    );
}

export default AddCar;
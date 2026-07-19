import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/AddCar.css";
import { createCar } from "../services/carService";
import CarForm from "../components/CarForm";

function AddCar() {
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        category: "",
        year: "",
        price: "",
        color: "",
        fuel_type: "",
        transmission: "",
        mileage: "",
        quantity: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            image: file,
        }));

        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);

            const data = new FormData();

            data.append("make", formData.make);
            data.append("model", formData.model);
            data.append("category", formData.category);
            data.append("year", Number(formData.year));
            data.append("price", Number(formData.price));
            data.append("color", formData.color);
            data.append("fuel_type", formData.fuel_type);
            data.append("transmission", formData.transmission);
            data.append("mileage", Number(formData.mileage));
            data.append("quantity", Number(formData.quantity));

            if (formData.image) {
                data.append("image", formData.image);
            }

            await createCar(data);

            alert("Car added successfully!");

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

                <p>
                    Enter the vehicle details below to add it to inventory.
                </p>

            </div>

            <CarForm
                formData={formData}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                previewImage={previewImage}
                buttonText={
                    submitting
                        ? "Saving..."
                        : "Add New Car"
                }
            />

        </div>
    );
}

export default AddCar;
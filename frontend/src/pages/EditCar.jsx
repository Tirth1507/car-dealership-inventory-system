import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/AddCar.css";
import CarForm from "../components/CarForm";
import { getCarById, updateCar } from "../services/carService";

function EditCar() {

    const { id } = useParams();
    const navigate = useNavigate();

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
                category: car.category,
                year: car.year,
                price: car.price,
                color: car.color,
                fuel_type: car.fuel_type,
                transmission: car.transmission,
                mileage: car.mileage,
                quantity: car.quantity,
                image: null,
            });

            if (car.image_url) {
                setPreviewImage(
                    `https://car-dealership-backend-akz1.onrender.com/uploads/${car.image_url}`
                );
            }

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

            await updateCar(id, data);

            alert("Car updated successfully!");

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
                <div className="form-state-message">
                    Loading car details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="add-car-page">
                <div className="form-state-message form-state-error">
                    {error}

                    <button
                        className="retry-btn"
                        onClick={fetchCar}
                    >
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
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                previewImage={previewImage}
                buttonText={
                    submitting
                        ? "Updating..."
                        : "Update Car"
                }
            />

        </div>
    );

}

export default EditCar;
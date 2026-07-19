import "../styles/AddCar.css";

function CarForm({
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    buttonText,
    previewImage,
}) {
    return (
        <div className="add-car-container">
            <h1>{buttonText}</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                    <label>Make</label>
                    <input
                        type="text"
                        name="make"
                        placeholder="Enter car make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="text"
                        name="model"
                        placeholder="Enter car model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <input
                        type="number"
                        name="year"
                        placeholder="Enter manufacturing year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder="Enter color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Fuel Type</label>

                    <select
                        name="fuel_type"
                        value={formData.fuel_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Transmission</label>

                    <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Mileage (km)</label>

                    <input
                        type="number"
                        name="mileage"
                        placeholder="Enter mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quantity</label>

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Enter available quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                {/* ---------- NEW IMAGE FIELD ---------- */}

                <div className="form-group">
                    <label>Car Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* ---------- IMAGE PREVIEW ---------- */}

                {previewImage && (
                    <div className="image-preview">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="preview-image"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="save-btn"
                >
                    {buttonText}
                </button>

            </form>
        </div>
    );
}

export default CarForm;
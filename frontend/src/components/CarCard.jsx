import "../styles/BrowseCars.css";

function CarCard({ car, onPurchase }) {

    return (

        <div className="car-card">

            <div className="car-image">

                {car.image_url ? (

                    <img
                    src={`https://car-dealership-backend-akz1.onrender.com/uploads/${car.image_url}`}
                    alt={`${car.make} ${car.model}`}
                    onError={(e) => {
                        e.target.src = "/car-placeholder.png";
                    }}
                />

                ) : (

                    <div className="car-placeholder">
                        🚗
                    </div>

                )}

            </div>

            <h2>
                {car.make} {car.model}
            </h2>

            <div className="category-badge">
                🚘 {car.category}
            </div>

            <p className="car-price">
                ₹{Number(car.price).toLocaleString("en-IN")}
            </p>

            <span
                className={
                    car.quantity > 0
                        ? "status available"
                        : "status out"
                }
            >
                {
                    car.quantity > 0
                        ? "Available"
                        : "Out of Stock"
                }
            </span>

            <div className="car-details">

                <p>
                    📅 <strong>Year:</strong> {car.year}
                </p>

                <p>
                    ⛽ <strong>Fuel:</strong> {car.fuel_type}
                </p>

                <p>
                    ⚙️ <strong>Transmission:</strong> {car.transmission}
                </p>

                <p>
                    🛣️ <strong>Mileage:</strong> {car.mileage} km
                </p>

                <p>
                    📦 <strong>Stock:</strong> {car.quantity}
                </p>

            </div>

            <button
                className="purchase-btn"
                disabled={car.quantity === 0}
                onClick={() => onPurchase(car.id)}
            >
                {
                    car.quantity === 0
                        ? "Out of Stock"
                        : "Purchase"
                }
            </button>

        </div>

    );

}

export default CarCard;
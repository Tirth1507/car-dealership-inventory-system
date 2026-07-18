import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

function CustomerDashboard() {

    const { user } = useAuth();

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>🚗 Welcome, {user?.first_name}!</h1>

                <p>
                    Browse our latest car collection.
                </p>

            </div>

            <div className="cards">

                <div className="card">
                    <h3>Available Cars</h3>
                    <h2>🚘</h2>
                </div>

                <div className="card">
                    <h3>Latest Models</h3>
                    <h2>⭐</h2>
                </div>

                <div className="card">
                    <h3>Premium Cars</h3>
                    <h2>🏎️</h2>
                </div>

                <div className="card">
                    <h3>Contact Dealer</h3>
                    <h2>📞</h2>
                </div>

            </div>

        </div>

    );
}

export default CustomerDashboard;
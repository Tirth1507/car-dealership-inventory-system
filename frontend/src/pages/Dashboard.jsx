import "../styles/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <h1>🚗 Dashboard</h1>
                <p>Welcome to Car Dealership Inventory System</p>
            </div>

            <div className="cards">

                <div className="card">
                    <h3>Total Cars</h3>
                    <h2>0</h2>
                </div>

                <div className="card">
                    <h3>Available Cars</h3>
                    <h2>0</h2>
                </div>

                <div className="card">
                    <h3>Sold Cars</h3>
                    <h2>0</h2>
                </div>

                <div className="card">
                    <h3>Total Value</h3>
                    <h2>₹0</h2>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;
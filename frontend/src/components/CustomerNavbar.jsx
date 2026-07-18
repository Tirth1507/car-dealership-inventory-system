import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function CustomerNavbar() {

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div className="logo">
                🚗 <span>Car Dealership</span>
            </div>

            <div className="nav-right">

                <Link to="/customer-dashboard">
                    Home
                </Link>

                <Link to="/browse-cars">
                    Browse Cars
                </Link>

                <span className="user-name">
                    👤 {user?.first_name}
                </span>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default CustomerNavbar;
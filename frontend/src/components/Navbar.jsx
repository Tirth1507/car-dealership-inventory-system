import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-brand">
                <span className="navbar-icon">🚗</span> Car Dealership
            </Link>

            <div className="nav-links">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/cars"
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                    Cars
                </NavLink>
                {/* <NavLink
                    to="/cars/add"
                    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                    Add Car
                </NavLink> */}

                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function AdminNavbar() {

    const { logout } = useAuth();

    return (

        <nav className="navbar">

            <div className="logo">
                🚗 <span>Car Dealership</span>
            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/cars">
                        Cars
                    </Link>
                </li>

                <li>
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </li>

            </ul>

        </nav>

    );
}

export default AdminNavbar;
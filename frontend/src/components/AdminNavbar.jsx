import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function AdminNavbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login", { replace: true });

    };

    return (
        <nav className="navbar">

            <div className="logo">
                🚗 <span>Car Dealership</span>
            </div>

            <ul className="nav-links">

                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/cars"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        Cars
                    </NavLink>
                </li>

                <li>
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>

            </ul>

        </nav>
    );

}

export default AdminNavbar;
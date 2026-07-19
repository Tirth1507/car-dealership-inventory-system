import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Login.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {

            setLoading(true);

            const response = await registerUser(formData);

            console.log("Register Response:", response);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.error("Registration Error:", error);

            if (error.response) {
                setError(
                    error.response.data.detail || "Registration failed."
                );
            } else {
                setError("Unable to connect to server.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="brand-mark">🚗</div>

                <h1>Car Dealership</h1>

                <h2>Create Account</h2>

                <p>Sign up to get started</p>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-row-inline">

                        <div className="form-group">

                            <label>First Name</label>

                            <input
                                type="text"
                                name="first_name"
                                placeholder="FIRST NAME"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input
                                type="text"
                                name="last_name"
                                placeholder="LAST NAME"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Re-enter your password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="register-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;
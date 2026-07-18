import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Cars from "../pages/Cars";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";
import NotFound from "../pages/NotFound";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Layout */}
                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/cars" element={<Cars />} />

                    <Route path="/cars/add" element={<AddCar />} />

                    <Route path="/cars/edit/:id" element={<EditCar />} />

                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
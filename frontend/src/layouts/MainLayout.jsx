import { Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AdminNavbar from "../components/AdminNavbar";
import CustomerNavbar from "../components/CustomerNavbar";

function MainLayout() {

    const { user } = useAuth();

    return (

        <>

            {user?.role === "admin"
                ? <AdminNavbar />
                : <CustomerNavbar />
            }

            <Outlet />

        </>

    );
}

export default MainLayout;
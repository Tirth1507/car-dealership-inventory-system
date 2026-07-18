import { useEffect, useState } from "react";
import { getAllCars } from "../services/carService";

function Cars() {

    const [cars, setCars] = useState([]);

    useEffect(() => {

        fetchCars();

    }, []);

    const fetchCars = async () => {

        try {

            const data = await getAllCars();

            console.log(data);

            setCars(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Cars</h1>

            <p>Total Cars: {cars.length}</p>
        </div>
    );
}

export default Cars;
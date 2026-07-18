import api from "./api";
import { getToken } from "../utils/token";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllCars = async () => {
    const response = await api.get("/cars", authHeader());
    return response.data;
};

export const createCar = async (carData) => {
    const response = await api.post(
        "/cars",
        carData,
        authHeader()
    );

    return response.data;
};
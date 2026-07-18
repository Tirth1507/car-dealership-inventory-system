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

export const getCarById = async (id) => {
    const response = await api.get(`/cars/${id}`, authHeader());
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

export const updateCar = async (id, carData) => {
    const response = await api.put(
        `/cars/${id}`,
        carData,
        authHeader()
    );

    return response.data;
};

export const deleteCar = async (id) => {
    const response = await api.delete(
        `/cars/${id}`,
        authHeader()
    );

    return response.data;
};
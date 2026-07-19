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

export const createCar = async (formData) => {
    const response = await api.post(
        "/cars",
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateCar = async (id, formData) => {
    const response = await api.put(
        `/cars/${id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data",
            },
        }
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

export const purchaseCar = async (id) => {
    const response = await api.post(
        `/cars/${id}/purchase`,
        {},
        authHeader()
    );

    return response.data;
};

export const restockCar = async (id, quantity) => {
    const response = await api.patch(
        `/cars/${id}/restock`,
        { quantity },
        authHeader()
    );

    return response.data;
};
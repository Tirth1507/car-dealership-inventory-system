import axios from "axios";

const api = axios.create({
    baseURL: "https://car-dealership-backend-akz1.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
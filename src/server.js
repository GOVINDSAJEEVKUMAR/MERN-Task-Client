import axios from "axios";

const Server = axios.create({
    baseURL: "http://localhost:3660",
});

export default Server;
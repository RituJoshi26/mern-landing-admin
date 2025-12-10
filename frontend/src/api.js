import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-landing-admin-backend.onrender.com/api"
});

export default API;

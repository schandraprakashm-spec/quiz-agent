import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://quiz-agent-zesh.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
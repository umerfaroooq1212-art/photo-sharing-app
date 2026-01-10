import axios from "axios";

const API = axios.create({
  baseURL: "https://photosharing.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

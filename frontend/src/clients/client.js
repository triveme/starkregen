import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 60 * 5, // 5 minutes
});

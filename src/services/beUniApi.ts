import axios from "axios";

export const beUniApi = axios.create({
  baseURL: process.env.API_URL,
});
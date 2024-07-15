import axios from "axios";

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/auth",
  withCredentials: true,
});

export const usersApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/users",
  withCredentials: true,
});

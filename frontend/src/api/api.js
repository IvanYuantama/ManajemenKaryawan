import axios from "axios";

const API_URL = "https://aksamedia-ivan-backend.vercel.app/api/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => api.post("/login", data);
export const logout = () => api.post("/logout");

export const getDivisions = (params) => api.get("/divisions", { params });

export const getEmployees = (params) => api.get("/employees", { params });
export const createEmployee = (formData) =>
  api.post("/employees", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateEmployee = (id, formData) =>
  api.post(`/employees/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const getNilaiRT = () => api.get("/nilaiRT");
export const getNilaiST = () => api.get("/nilaiST");

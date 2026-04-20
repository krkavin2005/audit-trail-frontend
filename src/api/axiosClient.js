import axios from "axios"

const axiosClient = axios.create({ baseURL: "https://digital-audit-trail-system.onrender.com", });
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
axiosClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/") {
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return Promise.reject(error);
})

export default axiosClient;
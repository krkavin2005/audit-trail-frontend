import axiosClient from "./axiosClient";

export const login = (data)=> axiosClient.post("/auth/login",data);
export const chPass = (data)=> axiosClient.post("/auth/change-password",data);
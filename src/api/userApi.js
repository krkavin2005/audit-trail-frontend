import axiosClient from "./axiosClient";

export const getUsers =()=> axiosClient.get("/users");
import axiosClient from "./axiosClient";

export const getUsers =()=> axiosClient.get("/users");
export const createUser =(form)=> axiosClient.post("/users",form);
export const deactivate =(id)=> axiosClient.patch(`/users/${id}/deactivate`);
export const reactivate =(id)=> axiosClient.patch(`/users/${id}/reactivate`);
export const promote =(id , roleName)=> axiosClient.patch(`/users/${id}/role`,{roleName});
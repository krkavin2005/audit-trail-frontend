import axiosClient from "./axiosClient";

export const getDocs =()=> axiosClient.get("/documents");
export const getDoc =(id)=> axiosClient.get(`/documents/${id}?mode=view`,{responseType :"blob"});
export const transitionapi =(_id , toState , managerId)=> axiosClient.get(`/documents/${id}/transition`,{toState , managerId});
export const getHistory =(id)=> axiosClient.get(`/documents/${id}/history`);
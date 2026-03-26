import axiosClient from "./axiosClient";

export const getDocs =(stat)=> axiosClient.get(`/documents?status=${stat}`);
export const getDoc =(id)=> axiosClient.get(`/documents/${id}?mode=view`,{responseType :"blob"});
export const transitionapi =(id , toState , managerId)=> axiosClient.patch(`/documents/${id}/transition`,{toState , managerId});
export const getHistory =(id)=> axiosClient.get(`/documents/${id}/history`);
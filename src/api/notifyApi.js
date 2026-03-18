import axiosClient from "./axiosClient";

export const getUnread =()=> axiosClient.get("/notifications/unread-count");
export const notify =()=> axiosClient.get("/notifications");
export const mark =(id)=> axiosClient.patch(`/notifications/${id}/read`);
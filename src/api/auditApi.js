import axiosClient from "./axiosClient";

export const genReport =()=> axiosClient.get("/verify/report");
export const getLogs =()=> axiosClient.get("audit/logs");
export const getMyLogs =()=> axiosClient.get("audit/my-logs");
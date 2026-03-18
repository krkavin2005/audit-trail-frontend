import axiosClient from "./axiosClient";

export const getReports =()=> axiosClient.get("/verify/reports");
export const upload =(form)=> axiosClient.post("verify/report/upload",form);
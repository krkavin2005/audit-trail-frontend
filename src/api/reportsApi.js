import axiosClient from "./axiosClient";

export const getReports =()=> axiosClient.get("/verify/reports");
export const upload =(form)=> axiosClient.post("verify/report/upload",form);
export const getReport =(id)=> axiosClient.get(`/verify/report/${id}/download`,{responseType:"blob"});
export const getKey =()=> axiosClient.get("verify/keys/public/fingerprint");
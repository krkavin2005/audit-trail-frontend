import axiosClient from "./axiosClient";

export const getStats =()=> axiosClient.get("/workflow/dashboard-summary");
export const getPending =()=> axiosClient.get("/workflow/pending");
export const getSubmissions =()=> axiosClient.get("/workflow/my-submissions");
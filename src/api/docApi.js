import axiosClient from "./axiosClient";

export const getDocs =({status,uploadedBy, mimeType, from, to, search}={})=> {
    console.log(status);
    
    return axiosClient.get("/documents",{
        params:{
            ...(status &&{status}),
            ...(uploadedBy &&{uploadedBy}),
            ...(mimeType &&{mimeType}),
            ...(from &&{from}),
            ...(to &&{to}),
            ...(search &&{search})
        }
    });}
export const getDoc =(id)=> axiosClient.get(`/documents/${id}?mode=view`,{responseType :"blob"});
export const transitionapi =(id , toState , managerId , comment)=> axiosClient.patch(`/documents/${id}/transition`,{toState , managerId , comment});
export const getHistory =(id)=> axiosClient.get(`/documents/${id}/history`);
export const uploadDoc =(file)=> axiosClient.post("documents/upload",file,{headers:{"Content-Type":"multipart/form-data"}});
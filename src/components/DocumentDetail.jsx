import { useEffect, useState } from "react";
import { getHistory, transitionapi } from "../api/docApi";
import { getUsers } from "../api/userApi";

const DocumentDetail = (props) => {
    const { doc, closeModal, handleView } = props;
    const [managerId , setManagerId]= useState("");
    const [managers,setManagers]= useState([]);
    const [history , setHistory]= useState([]);
    const [activeTab , setActiveTab]= useState("detail");

    const transition = async (toState) => {
        if(toState ==="SUBMITTED" && !managerId){
            alert("PLease select a reviewer");
            return;
        }
        try {
            await transitionapi(doc._id , toState , managerId);
            alert("Status updated");
            closeModel();
        }catch(err){
            console.error(err)
                alert(err.response?.data?.message);
        }
    }

    useEffect(()=>{
        const fetchManagers = async()=>{
            try{
                const res = await getUsers();
                const data = res.data.users.filter(user => user.role ==="MANAGER"|| user.role ==="ADMIN");                
                setManagers(data);
            }catch(err){
                console.error(err);
            }
        }
        const fetchHistory = async()=>{
            try{
                const res = await getHistory(doc.documentId);
                console.log(res.data);
                
                setHistory(res.data.history);
            }catch(err) {
                console.error(err);
            }
        };
        fetchManagers();
        if(activeTab ==="history")
        fetchHistory();
    },[activeTab]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-grey-900 border border-slate-800 rounded-xl p-6 w-[600px] shadow-2xl shadow-indigo-900/30">
                <div className="flex justify-between items-center mb-6">
                    <h2 onClick={()=> setActiveTab("detail")} className={`text-xl font-bold ${activeTab ==="detail"?"text-white":"text-slate-400"} cursor-pointer`}>Detail</h2>
                    <h2 onClick={()=> setActiveTab("history")} className={`text-xl font-bold ${activeTab ==="history"?"text-white":"text-slate-400"} cursor-pointer`}>History</h2>
                    <button onClick={closeModal} className="text-slate-400 hover:text-white">X</button>
                </div>
                {activeTab ==="detail"&&(
                    <>
                <div className="space-y-3 text-slate-300 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-800">
                    <p><b>{doc.originalName}</b></p>
                    {Object.keys(doc).map((key) => {
                        if (key !== "createdAt" && key !== "updatedAt" && key !== "escalatedAt" && key !== "uploadedBy" && key !== "assignedTo" && key !== "fileHash" && key !== "_id") {
                            return (<p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}: </b>{typeof doc[key] === "boolean" ? doc[key].toString().toUpperCase() : doc[key]}</p>)
                        }
                        else if (key === "uploadedBy" || key === "assignedTo") {
                            return (
                                <>
                                    <p><b>{key === "uploadedBy" ? "UploadedBy" : "AssignedTo"}: </b>{doc[key].username}</p>
                                    <p><b>Email: </b>{doc[key].email}</p>
                                </>
                            )
                        }
                    })}
                    {Object.keys(doc).map((key) => {
                        if (key === "createdAt" || key === "updatedAt" || key === "escalatedAt") {
                            return (<p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}: </b>{doc[key]}</p>)
                        }
                    })}
                </div>
                <div className="flex justify-center items-center mt-6">
                    <button onClick={(e) => handleView(e, doc)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white">View</button>
                </div>
                <div className="border-t border-slate-800 mt-6 pt-6 flex justify-center">
                    {doc.status === "DRAFT" && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Submit for Review</h3>
                            <select value={managerId} onChange={(e)=> setManagerId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 mb-4">
                                <option value="" className="bg-slate-700">Select Reviewer</option>
                                {managers.map((manager)=>(
                                    <option key={manager._id} value={manager._id}>{manager.username}</option>
                                ))}
                            </select>
                            <button onClick={()=> transition("SUBMITTED")} className="bg-yellow-500/20 text-yellow-400 rounded-lg px-4 py-2">Submit</button>
                        </div>
                    )}
                    {doc.status === "SUBMITTED" && (
                        <>
                            <button className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg mr-5" onClick={() => transition("APPROVED")}>Approve</button>
                            <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg" onClick={() => transition("REJECTED")}>Reject</button>
                        </>
                    )}
                    {doc.status === "APPROVED" && (<button onClick={() => transition("ARCHIVED")} className="bg-slate-500/20 text-slate-400 px-4 py-2 rounded-lg">Archive</button>)}
                    {doc.status === "REJECTED" && (<button onClick={() => transition("DRAFT")} className="bg-white/20 text-white/60 px-4 py-2 rounded-lg">Mark as draft</button>)}
                </div>
                </>)}
                {activeTab ==="history"&&(
                    <div className="max-h-96 overflow-y-auto space-y-4">
                        {history.length === 0 && <p className="text-slate-400">No workflow history</p>}
                        {history.map((event , index)=>(
                            <div key={index} className="flex">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                                    <div className="bg-slate-900/60 backdrop-blur p-4 rounded-lg border border-slate-800 w-full">
                                        <p className="text-white font-medium">{event.fromState} → {event.toState}</p>
                                        <p className="text-slate-400 text-sm">By {event.actedBy.username}</p>
                                        {event.comment && (
                                            <p className="text-slate-500 text-sm mt-1">Comment : {event.comment}</p>
                                        )}
                                        <p className="text-slate-500 text-xs mt-2">{new Date(event.createdAt).toLocaleString()}</p>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentDetail;
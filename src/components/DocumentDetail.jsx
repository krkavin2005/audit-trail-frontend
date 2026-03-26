import { useEffect, useState } from "react";
import { getHistory, transitionapi } from "../api/docApi";
import { getUsers } from "../api/userApi";
import Detail from "./Detail";
import History from "./History";

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
            await transitionapi(doc.documentId , toState , managerId);
            alert("Status updated");
            closeModal();
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
                <Detail doc={doc} />
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
                    <History history={history} />
                )}
            </div>
        </div>
    );
};

export default DocumentDetail;
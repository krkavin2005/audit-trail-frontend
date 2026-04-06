import { useState } from "react"
import { genReport } from "../api/auditApi";
import Report from "../components/Report";
import Logs from "../components/Logs";

const AuditPage =()=>{
    const [view , setView]= useState("logs");
    const [data , setData]= useState(null)

    const verify = async()=>{
        const res = await genReport()
        setData(res.data);
        setView("verify");
    };

    return(
    <div>
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide">Audit Logs</h1>
            {view ==="logs" &&(
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 px-6 py-2.5 rounded-xl font-medium text-white" onClick={()=> verify()}>Verify Audit Chain</button>
            )}
            {view ==="verify" &&(
                <button className="px-5 py-2 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 rounded-lg transition-all" onClick={()=> setView("logs")}>Back to Logs</button>
            )}
        </div>
        {view ==="verify" && <Report data={data}/>}
        {view ==="logs" && <Logs />}
    </div>
    );
};

export default AuditPage;
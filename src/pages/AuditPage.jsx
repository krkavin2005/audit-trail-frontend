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
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-white font-bold">Audit Logs</h1>
            {view ==="logs" &&(
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white" onClick={()=> verify()}>Verify Audit Chain</button>
            )}
            {view ==="verify" &&(
                <button className="text-slate-400 hover:text-white" onClick={()=> setView("logs")}>Back to Logs</button>
            )}
        </div>
        {view ==="verify" && <Report data={data}/>}
        {view ==="logs" && <Logs />}
    </div>
    );
};

export default AuditPage;
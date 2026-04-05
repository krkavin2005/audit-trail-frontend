import { useEffect } from "react";
import { useState } from "react";
import { getLogs } from "../api/auditApi";

const Logs =()=>{
    const [logs , setLogs]= useState([]);

    useEffect(()=>{
        const fetchLogs = async()=>{
            const res = await getLogs();
            setLogs(res.data.logs);
        };

        fetchLogs();
    },[]);

    return(
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 h-115 overflow-y-auto">
            <table className="w-full text-left">
                <thead className="border-b border-slate-800 text-slate-400 text-sm">
                    <tr>
                        <th className="py-3">Actor</th>
                        <th>Action</th>
                        <th>Target</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log)=>(
                        <tr key={log.eventId} className="border-b border-slate-800 hover:bg-slate-800/50 transition text-sm">
                            <td className="py-3 text-white">{log.actor}</td>
                            <td>{log.action}</td>
                            <td>{log.target}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logs;
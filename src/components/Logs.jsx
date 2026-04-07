import { useEffect, useState } from "react";
import { getLogs } from "../api/auditApi";
import Loader from "./Loader";

const Logs =()=>{
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchLogs = async()=>{
            setLoading(true);
            try {
                const res = await getLogs();
                console.log(res);
                setLogs(res.data.logs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    },[]);

    return(
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 h-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
            {loading ? (
                <Loader message="Fetching audit logs..." />
            ) : (
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
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-slate-400">No logs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Logs;
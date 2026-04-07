import { useState } from "react"
import { genReport } from "../api/auditApi";
import Report from "../components/Report";
import Logs from "../components/Logs";

const AuditPage =()=>{
    const [view , setView]= useState("logs");
    const [data , setData]= useState(null);
    const [verifying, setVerifying] = useState(false);

    const verify = async()=>{
        setVerifying(true);
        try {
            const res = await genReport()
            setData(res.data);
            setView("verify");
        } catch (err) {
            console.error(err);
        } finally {
            setVerifying(false);
        }
    };

    return(
    <div>
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide">Audit Logs</h1>
            {view ==="logs" &&(
                <button disabled={verifying} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 px-6 py-2.5 rounded-xl font-medium text-white disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center min-w-[200px]" onClick={()=> verify()}>
                    {verifying ? (
                        <div className="flex items-center gap-2">
                             <svg className="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Verifying...
                        </div>
                    ) : "Verify Audit Chain"}
                </button>
            )}
            {view ==="verify" &&(
                <button className="px-5 py-2.5 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-800/50 rounded-xl transition-all font-medium" onClick={()=> setView("logs")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back to Logs
                </button>
            )}
        </div>
        {view ==="verify" && <Report data={data}/>}
        {view ==="logs" && <Logs />}
    </div>
    );
};

export default AuditPage;
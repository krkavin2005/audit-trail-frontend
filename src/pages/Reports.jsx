import { useEffect, useState } from "react";
import { getReports, upload } from "../api/reportsApi";
import Report from "../components/Report";

const Reports =()=>{
    const [reports , setReports]= useState([]);
    const[selectedReport , setSelectedReport]= useState(null);
    const[file , setFile]= useState(null);
    const[uploadResult , setUploadResult]= useState(null);

    useEffect(()=>{
        const fetchReports = async()=>{
            const res = await getReports();
            setReports(res.data.reports);
        };

        fetchReports()
    },[]);

    const handleUpload = async()=>{
        if(!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try{
            const res = await upload(formData);
            setUploadResult(res.data);
        }catch(err){
            console.error(err);
        }
    };
    if(selectedReport){
        return (
            <div className="p-6">
                <button className="mb-6 text-slate-400 hover:text-white" onClick={()=>setSelectedReport(null)}>Back</button>
                <Report data ={selectedReport}/>
            </div>
        );
    }

    return(
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold text-white">Verification Reports</h1>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
                <h2 className="text-white font-semibold">Upload & Verify Report</h2>
                <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg" onClick={handleUpload}>Verify</button>
                {uploadResult &&(
                    <div className="mt-4 text-slate-300">
                        <p className="font-semibold">Status : <span className={uploadResult.status ==="VALID"?"text-green-400":"text-red-400"}>{uploadResult.status}</span></p>
                        <p>{uploadResult.message}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-around gap-4 h-70 overflow-y-auto">
                {reports.map((report)=>(
                    <div className="bg-slate-900 border border-slate-800 p-4 flex justify-center items-center" key={report.reportId}>
                        <div className="text-white font-semibold" onClick={()=> setSelectedReport(report)}>
                            <p>{report.reportId}</p>
                            <p>{new Date(report.verifiedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
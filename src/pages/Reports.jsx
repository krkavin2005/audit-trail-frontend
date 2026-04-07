import { useEffect, useState } from "react";
import { getReport, getReports, upload } from "../api/reportsApi";
import Report from "../components/Report";
import Loader from "../components/Loader";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await getReports();
            setReports(res.data.reports);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports()
    }, []);

    const handleUpload = async () => {
        if (!file) {
            setUploadResult(null);
            return;
        }
        setVerifying(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await upload(formData);
            setUploadResult(res.data);
            fetchReports(); // Refresh the list of reports after a successful new upload
        } catch (err) {
            console.error(err);
            setUploadResult({ status: "ERROR", message: "Failed to verify the report." });
        } finally {
            setVerifying(false);
        }
    };

    const handleDownload = async () => {
        try {
            const res = await getReport(selectedReport.reportId);
            console.log(res);
            
            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement("a");
            link.href = url;
            const disposition = res.headers["content-disposition"];
            console.log(disposition);
            
            let filename;
            if (disposition) {
                const match = disposition.match(/filename="(.+)"/);
                if (match) filename = match[1];
            }
            link.download = filename || `${selectedReport.reportId}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };

    if (selectedReport) {
        return (
            <div className="p-6">
                <button className="mb-6 text-slate-400 hover:text-white flex items-center gap-2" onClick={() => setSelectedReport(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    Back to Reports
                </button>
                <Report data={selectedReport} />
                <button onClick={handleDownload} className="mt-6 bg-gradient-to-r flex items-center gap-2 from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/40 transition-all font-semibold px-6 py-3 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download Audit PDF
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide pb-4 border-b border-slate-800/80">Verification Reports</h1>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-8 space-y-6 mb-8 max-w-3xl">
                <h2 className="text-xl text-white font-bold tracking-tight">Upload & Verify Report</h2>
                <div className="flex flex-col md:flex-row items-center gap-4 border border-slate-800/60 p-2 rounded-2xl relative bg-slate-900/20">
                    <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                    <label htmlFor="fileInput" className="flex-1 cursor-pointer hover:bg-slate-800/40 rounded-xl px-4 py-4 transition-all text-slate-300 font-medium w-full flex items-center gap-3 truncate">
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        </div>
                       <span className="truncate">{file ? file.name : "Select a report file to verify (.pdf)"}</span>
                    </label>
                    <button 
                        disabled={verifying || !file} 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:-translate-y-1 md:h-full w-full md:w-auto disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                        onClick={handleUpload}
                    >
                        {verifying ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Checking...
                            </>
                        ) : "Verify Integrity"}
                    </button>
                </div>
                {uploadResult && (
                    <div className={`mt-4 p-4 rounded-xl border flex items-start gap-4 ${uploadResult.status === "VALID" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                        {uploadResult.status === "VALID" ? (
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-400 shrink-0"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500 shrink-0"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
                        )}
                        <div>
                            <p className="font-bold text-white mb-1 tracking-wide">{uploadResult.status === "VALID" ? "Report Validated" : "Validation Failed"}</p>
                            <p className={`text-sm ${uploadResult.status === "VALID" ? "text-green-300" : "text-red-300"}`}>{uploadResult.message}</p>
                        </div>
                    </div>
                )}
            </div>
            
            {loading ? (
                <Loader message="Fetching verification reports..." />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto p-2 mt-8">
                    {reports.map((report) => (
                        <div className="group bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 flex flex-col justify-center items-start rounded-2xl cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-indigo-500/50 relative overflow-hidden" onClick={() => setSelectedReport(report)} key={report.reportId}>
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative text-white font-semibold w-full">
                               <div className="flex justify-between items-center w-full mb-3">
                                   <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/20">Report</span>
                               </div>
                               <p className="text-lg font-bold truncate">{report.reportId}</p>
                               <p className="text-slate-400 text-sm mt-2">{new Date(report.verifiedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    {reports.length === 0 && (
                        <div className="col-span-full">
                            <p className="text-slate-500 italic text-center">No reports found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Reports;
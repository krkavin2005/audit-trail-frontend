import { useEffect, useState } from "react";
import { getReport, getReports, upload } from "../api/reportsApi";
import Report from "../components/Report";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            const res = await getReports();
            setReports(res.data.reports);
        };

        fetchReports()
    }, []);

    const handleUpload = async () => {
        if (!file) {
            setUploadResult("");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await upload(formData);
            setUploadResult(res.data);
        } catch (err) {
            console.error(err);
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
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
        }
    };

    if (selectedReport) {
        return (
            <div className="p-6">
                <button className="mb-6 text-slate-400 hover:text-white" onClick={() => setSelectedReport(null)}>Back</button>
                <Report data={selectedReport} />
                <button onClick={handleDownload} className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg">Download</button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-10">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide pb-4 border-b border-slate-800/80">Verification Reports</h1>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-8 space-y-6 mb-8 max-w-3xl">
                <h2 className="text-xl text-white font-bold tracking-tight">Upload & Verify Report</h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                    <label htmlFor="fileInput" className="flex-1 cursor-pointer border-2 border-dashed border-slate-600 hover:border-indigo-400 hover:bg-indigo-500/5 rounded-xl px-4 py-8 text-center transition-all bg-slate-800/30 text-slate-300 font-medium w-full truncate">
                       {file ? file.name : "Select a report file to verify"}
                    </label>
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 px-8 py-8 rounded-xl font-semibold text-white transition-all hover:-translate-y-1 md:h-full w-full md:w-auto" onClick={handleUpload}>Verify</button>
                </div>
                {uploadResult && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <p className="font-semibold text-white mb-1">Status : <span className={uploadResult.status === "VALID" ? "text-green-400" : "text-red-400"}>{uploadResult.status}</span></p>
                        <p className={`text-sm ${uploadResult.status === "VALID" ? "text-green-300" : "text-red-300"}`}>{uploadResult.message}</p>
                    </div>
                )}
            </div>
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
            </div>
        </div>
    );
};

export default Reports;
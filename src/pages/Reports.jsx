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
            <h1 className="text-2xl font-bold text-white">Verification Reports</h1>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4 mb-0">
                <h2 className="text-white font-semibold">Upload & Verify Report</h2>
                <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                <label htmlFor="fileInput" className="w-full cursor-pointer text-slate-300 bg-slate-800 rounded-lg px-3 py-2 text-left mr-10">{file ? file.name : "Upload file"}</label>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg" onClick={handleUpload}>Verify</button>
                {uploadResult && (
                    <div className="mt-4 text-slate-300">
                        <p className="font-semibold">Status : <span className={uploadResult.status === "VALID" ? "text-green-400" : "text-red-400"}>{uploadResult.status}</span></p>
                        <p className={uploadResult.status === "VALID" ? "text-green-400" : "text-red-400"}>{uploadResult.message}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-around gap-4 h-70 overflow-y-auto p-5 mt-5">
                {reports.map((report) => (
                    <div className="bg-slate-900 border border-slate-800 p-4 flex justify-center items-center rounded-lg hover:transition-transform duration-300 ease-in-out hover:scale-110 " key={report.reportId}>
                        <div className="text-white font-semibold cursor-pointer" onClick={() => setSelectedReport(report)}>
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
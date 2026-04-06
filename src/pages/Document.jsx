import { useEffect, useState } from "react";
import DocumentTable from "../components/DocumentTable"
import { getDocs } from "../api/docApi";
import UploadModel from "../components/UploadModel";
import DocumentDetail from "../components/DocumentDetail";

const Document = (props) => {
    const { selectedDocument, setSelectedDocument, handleView } = props;
    const [documents, setDocuments] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [filters, setFilters] = useState({ status: "", uploadedBy: "", mimeType: "", from: "", to: "", search: "" });
    const types = [
        ["application/pdf", "PDF"],
        ["image/png", "PNG"],
        ["image/jpeg", "JPEG"],
        ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "DOCX"],
        ["application/msword", "DOC"],
        ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "XLSX"],
        ["application/vnd.ms-exel", "XLS"]
    ];
    const fetch = async (custom = filters) => {
        const res = await getDocs(custom);
        setDocuments(res.data.documents);
    };
    const updateFilter = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        fetch(updated);
    }
    const handleReset = () => {
        setFilters({ status: "", uploadedBy: "", mimeType: "", from: "", to: "", search: "" });
        fetch({});
    }
    useEffect(() => {
        fetch();
    }, [])
    return (
        <div>
            <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide">Documents</h1>
                <button onClick={() => setShowUpload(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 px-6 py-2.5 rounded-xl font-medium text-white flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
                    Upload Document
                </button>
            </div>
            <div className="relative mb-6">
                <input type="text" placeholder="Search Docs..." value={filters.search} onChange={(e) => updateFilter("search", e.target.value)} className="w-full p-4 pl-12 rounded-xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-4 text-slate-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            </div>
            <div className="flex flex-wrap gap-3 mb-6 bg-slate-900/40 p-2 rounded-2xl border border-slate-800/60 w-fit backdrop-blur-sm">
                {["", "DRAFT", "SUBMITTED", "APPROVED", "REJECTED", "ARCHIVED"].map((s) => (
                    <button key={s} onClick={() => updateFilter("status", s)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${(filters.status === s) || (!filters.status && s === "") ? "bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"}`}>{s || "ALL"}</button>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <input type="text" placeholder="Uploaded By" value={filters.uploadedBy} onChange={(e) => updateFilter("uploadedBy", e.target.value)} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500" />
                <select onChange={(e) => updateFilter("mimeType", e.target.value)} value={filters.mimeType} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 appearance-none">
                    <option value="">All types</option>
                    {types.map(([value, label]) =>
                        <option value={value} key={value}>{label}</option>
                    )}
                </select>
                <div className="flex flex-col">
                    <label className="text-xs text-slate-400 mb-1">From Date</label>
                    <input type="date" value={filters.from} onChange={(e) => updateFilter("from", e.target.value)} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-slate-400 mb-1">To Date</label>
                <input type="date" value={filters.to} onChange={(e) => updateFilter("to", e.target.value)} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="flex items-end">
                    <button onClick={() => handleReset()} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3 rounded-lg border border-slate-700 hover:border-slate-500 transition-all font-semibold">Reset Filters</button>
                </div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 h-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                <DocumentTable documents={documents} handleView={handleView} setSelectedDocument={setSelectedDocument} />
            </div>
            {showUpload && (<UploadModel closeModel={() => setShowUpload(false)} fetch={fetch}/>)}
            {selectedDocument && (<DocumentDetail doc={selectedDocument} closeModal={() => setSelectedDocument(null)} handleView={handleView} fetch={fetch}/>)}
        </div>
    );
};

export default Document;
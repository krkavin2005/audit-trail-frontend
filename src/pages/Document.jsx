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
            <div className="flex justify-around items-center mb-6 flex-">
                <h1 className="text-2xl font-bold text-white">Documents</h1>
                <button onClick={() => setShowUpload(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white">Upload Document</button>
            </div>
            <input type="text" placeholder="Search Docs..." value={filters.search} onChange={(e) => updateFilter("search", e.target.value)} className="w-full p-2 mb-4 rounded bg-slate-800 text-white" />
            <div className="flex gap-2 mb-4">
                {["", "DRAFT", "SUBMITTED", "APPROVED", "REJECTED", "ARCHIVED"].map((s) => (
                    <button key={s} onClick={() => updateFilter("status", s)} className={`px-3 py-1 rounded-full text-sm ${filters.status === !s || filters.status === s ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "bg-slate-700 text-slate-300"}`}>{s || "ALL"}</button>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <input type="text" placeholder="Uploaded By" value={filters.uploadedBy} onChange={(e) => updateFilter("uploadedBy", e.target.value)} className="p-2 rounded bg-slate-800 text-white" />
                <select onChange={(e) => updateFilter("mimeType", e.target.value)} value={filters.mimeType} className="p-2 rounded bg-slate-800 text-white">
                    <option value="">All types</option>
                    {types.map(([value, label]) =>
                        <option value={value}>{label}</option>
                    )}
                </select>
                <div>
                    <label>From: </label>
                    <input type="date" value={filters.from} onChange={(e) => updateFilter("from", e.target.value)} className="p-2 rounded bg-slate-800 text-white" />
                </div>
                <div>
                    <label>To: </label>
                <input type="date" value={filters.to} onChange={(e) => updateFilter("to", e.target.value)} className="p-2 rounded bg-slate-800 text-white" />
                </div>
                <button onClick={() => handleReset()} className="bg-red-500 px-3 py-2 rounded text-white">Reset</button>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 h-96 overflow-y-auto">
                <DocumentTable documents={documents} handleView={handleView} setSelectedDocument={setSelectedDocument} />
            </div>
            {showUpload && (<UploadModel closeModel={() => setShowUpload(false)} fetch={fetch}/>)}
            {selectedDocument && (<DocumentDetail doc={selectedDocument} closeModal={() => setSelectedDocument(null)} handleView={handleView} fetch={fetch}/>)}
        </div>
    );
};

export default Document;
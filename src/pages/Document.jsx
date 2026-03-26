import { useEffect, useState } from "react";
import DocumentTable from "../components/DocumentTable"
import { getDocs } from "../api/docApi";
import UploadModel from "../components/uploadModel";
import DocumentDetail from "../components/DocumentDetail";

const Document = (props) => {
    const {selectedDocument , setSelectedDocument , handleView}= props;
    const [documents, setDocuments] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const res = await getDocs();
            console.log(res.data.documents);

            setDocuments(res.data.documents);
        };
        fetch();
    }, [])
    return (
        <div>
            <div className="flex justify-around items-center mb-6 flex-">
                <h1 className="text-2xl font-bold text-white">Documents</h1>
                <button onClick={() => setShowUpload(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white">Upload Document</button>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <DocumentTable documents={documents} handleView={handleView} setSelectedDocument={setSelectedDocument}/>
            </div>
            {showUpload && (<UploadModel closeModel={() => setShowUpload(false)} />)}
            {selectedDocument && (<DocumentDetail doc={selectedDocument} closeModal={() => setSelectedDocument(null)} handleView={handleView}/>)}
        </div>
    );
};

export default Document;
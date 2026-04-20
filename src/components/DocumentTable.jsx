import { getDoc } from "../api/docApi";

const statusColor = {
    DRAFT: "bg-white/20 text-white/60",
    SUBMITTED: "bg-yellow-500/20 text-yellow-400",
    APPROVED: "bg-green-500/20 text-green-400",
    REJECTED: "bg-red-500/20 text-red-400",
    ARCHIVED: "bg-slate-500/20 text-slate-400"
};

const DocumentTable = (props) => {
    const { documents, setSelectedDocument, handleView } = props;
    return (
        <table className="w-full text-left">
            <thead className="border-b border-slate-800 text-slate-400 text-sm">
                <tr>
                    <th className="py-3">Name</th>
                    <th className="py-3">Owner</th>
                    <th className="py-3">Actions</th>
                    <th className="py-3">Created</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc) => (
                    <tr key={doc._id} onClick={() => setSelectedDocument(doc)} className="border-b border-slate-800 hover:bg-slate-800/50 transition text-sm">
                        <td className="py-3 text-white">{doc.originalName}</td>
                        <td>{doc.uploadedBy.username}</td>
                        <td>
                            <span className={`px-3 py-1 text-xs rounded-full ${statusColor[doc.status]}`}>{doc.status}</span>
                        </td>
                        <td>{new Date(doc.createdAt).toLocaleString()}</td>
                        <td><button onClick={(e) => handleView(e, doc)} className="text-indigo-400 hover:text-indigo-300">View</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DocumentTable;



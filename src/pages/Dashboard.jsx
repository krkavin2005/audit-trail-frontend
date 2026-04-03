import { useEffect, useState } from "react";
import { getPending, getStats, getSubmissions } from "../api/workflowApi";
import Card from "../components/Card";
import DocumentTable from "../components/DocumentTable";
import DocumentDetail from "../components/DocumentDetail";
import { getDocs } from "../api/docApi";

const Dashboard = (props) => {
    const { selectedDocument, setSelectedDocument, handleView } = props;
    const [stats, setStats] = useState([]);
    const [display, setDisplay] = useState("dashboard");
    const [documents, setDocuments] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const fetchStats = async () => {
        const res = await getStats();
        setStats(res.data.counts);
    };
    const fetchPending = async () => {
        const res = await getPending();
        setDocuments(res.data.documents);
    };
    const fetchSubmissions = async () => {
        const res = await getSubmissions();
        setDocuments(res.data.documents);
    };
    const fetchFilter = async () => {
        const res = await getDocs({status : selectedCard});
        setDocuments(res.data.documents);
    }

    useEffect(() => {
        if (display === "dashboard") fetchStats();
        if (display === "pending") fetchPending();
        if (display === "submission") fetchSubmissions();
        if (selectedCard && display ==="dashboard") fetchFilter();
    }, [display, selectedDocument, selectedCard]);
    console.log(documents);

    return (
        <div>
            <div className="flex mb-4">
                <h1 onClick={() => {setDisplay("dashboard"); setDocuments([])}} className={`text-2xl font-bold mb-6 mr-6 p-2 ${display === "dashboard" ? "text-white border-5 rounded-lg border-slate-400" : "text-slate-400 text-md"} cursor-pointer`}>Dashboard</h1>
                <h1 onClick={() => {setDisplay("pending");setSelectedCard(null)}} className={`text-2xl font-bold mb-6 mr-6 p-2 ${display === "pending" ? "text-white border-5 rounded-lg" : "text-slate-400 text-md"} border-l border-slate-400 cursor-pointer`}>Pending</h1>
                <h1 onClick={() => {setDisplay("submission");setSelectedCard(null)}} className={`text-2xl font-bold mb-6 mr-6 p-2 ${display === "submission" ? "text-white border-5 rounded-lg" : "text-slate-400 text-md"} border-l border-slate-400 cursor-pointer`}>My Submissions</h1>
            </div>
            {display === "dashboard" && !selectedCard && <div className="flex flex-wrap gap-15 justify-around">
                {Object.keys(stats).map((key) => (
                    <Card stats={stats} val={key} setSelectedCard={setSelectedCard} />
                ))}
            </div>
            }
            {display === "dashboard" && selectedCard &&
                <>
                    <button onClick={() => setSelectedCard(null)} className="mb-4 text-lg font-bold text-slate-400 hover:text-white">Back</button>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                        <DocumentTable documents={documents} handleView={handleView} setSelectedDocument={setSelectedDocument} />
                    </div>
                </>
            }
            {display === "pending" && documents.length === 0 && <h1 className="text-slate-400 text-xl">No Pending Works</h1>}
            {display === "submission" && documents.length === 0 && <h1 className="text-slate-400 text-xl">No Submissions Done</h1>}
            {display !== "dashboard" && documents.length !== 0 &&
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <DocumentTable documents={documents} handleView={handleView} setSelectedDocument={setSelectedDocument} />
                </div>
            }
            {selectedDocument && (<DocumentDetail doc={selectedDocument} closeModal={() => setSelectedDocument(null)} handleView={handleView} fetch={fetchFilter} />)}
        </div>

    )
}

export default Dashboard;
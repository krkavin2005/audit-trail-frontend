import { useEffect, useState } from "react";
import { getPending, getStats, getSubmissions } from "../api/workflowApi";
import Card from "../components/Card";
import DocumentTable from "../components/DocumentTable";
import DocumentDetail from "../components/DocumentDetail";
import { getDocs } from "../api/docApi";
import Loader from "../components/Loader";

const Dashboard = (props) => {
    const { selectedDocument, setSelectedDocument, handleView } = props;
    const [stats, setStats] = useState([]);
    const [display, setDisplay] = useState("dashboard");
    const [documents, setDocuments] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await getStats();
            setStats(res.data.counts);
        } catch (err) { console.error(err); }
        setLoading(false);
    };
    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await getPending();
            setDocuments(res.data.documents);
        } catch (err) { console.error(err); }
        setLoading(false);
    };
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await getSubmissions();
            setDocuments(res.data.documents);
        } catch (err) { console.error(err); }
        setLoading(false);
    };
    const fetchFilter = async () => {
        setLoading(true);
        try {
            const res = await getDocs({ status: selectedCard });
            setDocuments(res.data.documents);
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    useEffect(() => {
        if (display === "dashboard" && !selectedCard) fetchStats();
        if (display === "pending") fetchPending();
        if (display === "submission") fetchSubmissions();
        if (selectedCard && display === "dashboard") fetchFilter();
    }, [display, selectedDocument, selectedCard]);

    return (
        <div>
            <div className="flex gap-4 mb-8 bg-slate-900/50 p-1.5 rounded-xl w-fit border border-slate-800/60 backdrop-blur-sm">
                <button
                    onClick={() => { setDisplay("dashboard"); setDocuments([]); setSelectedCard(null) }}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${display === "dashboard" ? "bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => { setDisplay("pending"); setSelectedCard(null) }}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${display === "pending" ? "bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => { setDisplay("submission"); setSelectedCard(null) }}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${display === "submission" ? "bg-indigo-600 shadow-lg shadow-indigo-900/40 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                >
                    My Submissions
                </button>
            </div>

            {loading ? (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <Loader message="Loading dashboard data..." />
                </div>
            ) : (
                <>
                    {display === "dashboard" && !selectedCard && <div className="flex flex-wrap gap-15 justify-around">
                        {Object.keys(stats).map((key) => (
                            <Card key={key} stats={stats} val={key} setSelectedCard={setSelectedCard} />
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
                </>
            )}
            {selectedDocument && (<DocumentDetail doc={selectedDocument} closeModal={() => setSelectedDocument(null)} handleView={handleView} fetch={fetchFilter} />)}
        </div>
    )
}

export default Dashboard;
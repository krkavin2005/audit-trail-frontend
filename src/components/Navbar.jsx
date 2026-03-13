import { useNavigate } from "react-router-dom";

const Navbar =()=>{
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex items-center justify-between px-6 py-10 border-b border-slate-800 bg-gradient-to-r from-grey-900 to-grey-800 backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-white">Document Governance System & Audit Compliance</h2>
            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-white">🔔</button>
                <button onClick={logout} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 hover:opacity-90 px-4 py-2 rounded-lg text-sm text-white">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
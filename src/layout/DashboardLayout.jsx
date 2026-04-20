import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
            <Sidebar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout
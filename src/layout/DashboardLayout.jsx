import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const DashboardLayout = ({children})=>{
    return(
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl shadow-purple-900/30 text-slate-200">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout
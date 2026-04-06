import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
    const location = useLocation();
    const navItems = [
        { name: "Dasboard", path: "/dashboard" },
        { name: "Documents", path: "/documents" },
        { name: "Users", path: "/users" },
        { name: "Audit Logs", path: "/audit" },
        { name: "Reports", path: "/reports" },
        // {name :"My Profile", path :"/profile"}
    ]

    return (
        <div className="w-64 bg-slate-950/80 p-6 border-r border-slate-800/60 backdrop-blur-2xl rounded-l-lg shadow-xl shrink-0">
            <h1 className="text-2xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 tracking-tight flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-500">
                    <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                </svg>
                Governance
            </h1>
            <nav className="flex flex-col gap-2 text-slate-300 font-medium">
                {navItems.map((item) => (
                    <Link key={item.name} to={item.path} className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${location.pathname == item.path ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-indigo-300 border-l-2 border-indigo-500 shadow-sm shadow-indigo-900/20" : "text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:bg-slate-800/40 hover:border-slate-600"}`}>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar
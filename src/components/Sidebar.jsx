import { Link, useLocation } from "react-router-dom"

const Sidebar =()=>{
    const location = useLocation();
    const navItems =[
        {name :"Dasboard", path :"/dashboard"},
        {name :"Documents", path :"/documents"},
        {name :"Upload", path :"/upload"},
        {name :"Workflow", path :"/workflow"},
        {name :"Users", path :"/users"},
        {name :"Audit Logs", path :"/audit"},
        {name :"Reports", path :"/reports"},
    ]

    return(
        <div className="w-64 bg-slate-950 p-6 border-r border-slate-800 backdrop-blur-xl rounded-lg">
            <h1 className="text-xl font-bold mb-10 text-white">Governance</h1>
            <nav className="flex flex-col gap-4 text-slate-300">
                {navItems.map((item)=>(
                    <Link key={item.name} to ={item.path} className={`px-3 py-2 rounded-lg transition ${location.pathname == item.path ?"bg-gradient-to-r from-slate-800 to-slate-700 text-white":"text-slate-400 hover:text-white hover:bg-slate-800"}`}>{item.name}</Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar
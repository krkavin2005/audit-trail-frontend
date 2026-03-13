const Dashboard =()=>{
    const stats =[
        {title:"Pending Approvals", value:12},
        {title:"My Documents", value:12},
        {title:"AuditEvents", value:12},
        {title:"Active workflows", value:12},
    ]
    return(
        <div>
            <h1 className="text-2xl font-bold mb-6 text-white">Dashboard</h1>
            <div className="grid grid-cols-4 gap-6">
                {stats.map((stat)=>(
                    <div key={stat.title} className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
                        <p className="text-slate-400 text-sm font-bold">{stat.title}</p>
                        <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Dashboard;
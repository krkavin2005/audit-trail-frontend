const Card = ({ stats, val , setSelectedCard}) => {
    const handleSelect = ()=>{
        if(stats[val]=== 0) return;
        setSelectedCard(val);
    }
    return (
        <div onClick={handleSelect} key={val} className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl shadow-indigo-900/40 w-70 hover:from-slate-800 to-slate-700">
            <p className="text-slate-400 text-sm font-bold">{val}</p>
            <p className="text-3xl font-bold mt-2 text-white">{stats[val]}</p>
        </div>
    );
}

export default Card;
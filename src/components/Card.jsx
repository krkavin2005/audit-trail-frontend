const Card = ({ stats, val, setSelectedCard }) => {
    const handleSelect = () => {
        if (stats[val] === 0) return;
        setSelectedCard(val);
    }
    return (
        <div onClick={handleSelect} key={val} className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-indigo-500/50 w-70 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <p className="relative text-slate-400 text-sm font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">{val}</p>
            <p className="relative text-4xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">{stats[val]}</p>
        </div>
    );
}

export default Card;
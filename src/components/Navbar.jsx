import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUnread, mark, notify } from "../api/notifyApi";

const Navbar = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await getUnread();
                setUnread(res.data.unread);
            } catch (err) {
                console.error(err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const loadNotifications = async () => {
        try {
            const res = await notify();
            console.log(res.data);

            setNotifications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleNotification = () => {
        setOpen(!open);
        console.log(open);

        if (!open) {
            loadNotifications();
        }
    };

    const markRead = async (id) => {
        try {
            await mark(id);
            setNotifications((prev) => {
                return prev.map((n) => n._id === id ? { ...n, isRead: true } : n);
            });
            setUnread((prev) => Math.max(prev - 1, 0));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative z-50 flex items-center justify-between px-8 py-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl rounded-xl shadow-lg shadow-black/20 mb-2">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 tracking-wide">Document Governance System & Audit Compliance</h2>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button onClick={toggleNotification} className="relative text-slate-400 hover:text-purple-400 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        {unread > 0 && (<span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full shadow border border-red-800/50">{unread}</span>)}
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-4 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] z-50 overflow-hidden transform origin-top-right transition-all">
                            <div className="p-4 bg-slate-800/50 border-b border-slate-700/50 text-white font-semibold flex justify-between items-center">
                                <span>Notifications</span>
                                {unread > 0 && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">{unread} new</span>}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length === 0 && (
                                    <p className="p-4 text-slate-400">No notifications</p>
                                )}
                                {notifications.map((n) => (
                                    <div key={n._id} onClick={() => markRead(n._id)} className={`p-4 border-b border-slate-800/50 cursor-pointer transition-colors duration-200 hover:bg-slate-800/80 ${n.isRead ? "bg-slate-900/30 opacity-60" : "bg-indigo-500/10 border-l-2 border-l-indigo-500"}`}>
                                        <p className={`text-sm ${n.isRead ? "text-slate-400" : "text-slate-200"}`}>{n.message}</p>
                                        <p className="text-xs text-slate-500 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={logout} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 px-5 py-2.5 rounded-xl font-medium text-sm text-white">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
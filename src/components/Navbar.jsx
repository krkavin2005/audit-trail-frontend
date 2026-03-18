import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUnread, mark, notify } from "../api/notifyApi";

const Navbar =()=>{
    const navigate = useNavigate();
    const [notifications , setNotifications]= useState([]);
    const [unread , setUnread]= useState(0);
    const [open , setOpen]= useState(false);

    const logout =()=>{
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(()=>{
        const interval = setInterval(async()=>{
            try{
                const res = await getUnread();
                setUnread(res.data.unread);
            }catch(err){
                console.error(err);
            }
        },2000);

        return ()=> clearInterval(interval);
    },[]);

    const loadNotifications = async()=>{
        try{
            const res = await notify();
            console.log(res.data);
            
            setNotifications(res.data);
        }catch(err){
            console.error(err);
        }
    };

    const toggleNotification =()=>{
        setOpen(!open);
        console.log(open);
        
        if(!open){
            loadNotifications();
        }
    };

    const markRead = async(id)=>{
        try{
            await mark(id);
            setNotifications((prev)=>{
                return prev.map((n)=> n._id === id ?{...n , isRead : true}: n);
            });
            setUnread((prev)=> Math.max(prev - 1 , 0));
        }catch(err){
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-between px-6 py-10 border-b border-slate-800 bg-gradient-to-r from-grey-900 to-grey-800 backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-white">Document Governance System & Audit Compliance</h2>
            <div className="flex items-center gap-4">
                <div className="realtive">
                <button onClick={toggleNotification} className="relative text-slate-400 hover:text-white">🔔{unread > 0 &&(<span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white px-1.5 rounded-full">{unread}</span>)}</button>
                {open &&(
                    <div className="absolute -right-0 mt-4 w-80 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-xl shadow-2xl shadow-purple-900/30">
                        <div className="p-4 border-b border-slate-800 text-white font-semibold">
                            Notifications
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.length === 0 && (
                                <p className="p-4 text-slate-400">No notifications</p>
                            )}
                            {notifications.map((n)=>(
                                <div key={n._id} onClick={()=> markRead(n._id)} className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 ${n.isRead ?"bg-indigo-500/10":""}`}>
                                    <p className="text-sm text-white">{n.message}</p>
                                    <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>
                <button onClick={logout} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 hover:opacity-90 px-4 py-2 rounded-lg text-sm text-white">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
import { useEffect, useState } from "react"
import { deactivate, getUsers, reactivate } from "../api/userApi";
import UserDetail from "../components/UserDetail";
import CreateUserModel from "../components/CreateUserModel";

const Users =()=>{
    const [users , setUsers]= useState([]);
    const [showCreate , setShowCreate]= useState(false);
    const [selectedUser , setSelectedUser]= useState(null);

    const fetchUsers = async()=>{
        const res = await getUsers();
        setUsers(res.data.users)
    };

    useEffect(()=>{
        fetchUsers();
    },[]);

    return(
        <div className="p-6 pb-0">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800/80 pb-4">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-wide">Users Management</h1>
                <button onClick={()=> setShowCreate(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5 px-6 py-2.5 rounded-xl font-medium text-white flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg> 
                    Create User
                </button>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-6 h-[28rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-800 text-slate-400 text-sm">
                        <tr>
                            <th className="py-3">Username</th>
                            <th>Eamil</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.userId} onClick={()=> setSelectedUser(user)} className="border-b border-slate-800 hover:bg-slate-800/50 transition text-sm">
                                <td className="py-3 text-white">{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><span className={user.isActive ? "text-green-400":"text-red-400"}>{user.isActive ?"Active":"Inactive"}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showCreate &&(
                <CreateUserModel close ={()=> setShowCreate(false)} refresh ={()=> fetchUsers()} />
            )}
            {selectedUser && <UserDetail selectedUser={selectedUser} closeModel={()=> setSelectedUser(null)} fetchUsers={fetchUsers}/>}
        </div>
    );
};

export default Users;
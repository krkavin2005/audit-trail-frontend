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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text;white">Users</h1>
                <button onClick={()=> setShowCreate(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white">+ Create User</button>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 h-110 overflow-y-auto">
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
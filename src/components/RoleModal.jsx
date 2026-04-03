import { useState } from "react";
import { promote } from "../api/userApi";

const RoleModal =(props)=>{
    const {user , close , refresh , closeModel}= props;
    const [role , setRole]= useState("");

    const handleUpdate = async()=>{
        try{
            if(!role) return;
            await promote(user.userId , role);
            refresh();
            closeModel();
            close();
        }catch(err){
            console.error(err);
        }
    };

    return(
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-grey-900 border border-slate-800 rounded-xl p-6 w-[400px] shadow-2xl shadow-indigo-900/30">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-bold">Role Change</h2>
                    <button className="text-slate-400 hover:text-white" onClick={close}>X</button>
                </div>
                <p className="text-slate-400 mb-4 text-sm">Updating role for <span>{user.username}</span></p>
                <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 mb-4" value={role} onChange={(e)=> setRole(e.target.value)}>
                    <option className="bg-slate-700" value="">Select Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                </select>
                <div className="flex justify-center">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg text-white" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default RoleModal;
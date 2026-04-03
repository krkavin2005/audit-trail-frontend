import { useState } from "react"
import { createUser } from "../api/userApi";

const CreateUserModel =({close , refresh})=>{
    const [user , setUser]= useState({username:"",email:"",password:"",roleName:""});
    

    const handleSubmit = async()=>{
        try{
            await createUser(user);
            refresh();
            close();
        }catch(err){
            console.error(err);
        }
    };

    return(
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm">
            <div className="bg-grey-900 border border-slate-800 rounded-xl p-6 w-[400px]">
                <div className="flex align-center justify-between mb-4">
                <h2 className="text-white text-lg font-bold">Create User</h2>
                <button onClick={close} className="text-slate-400 hover:text-white">X</button>
                </div>
                <input placeholder="Username" onChange={(e)=>setUser({...user , username : e.target.value})} className="w-full mb-3 p-2 bg-slate-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input placeholder="Email" onChange={(e)=>setUser({...user , email : e.target.value})} className="w-full mb-3 p-2 bg-slate-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <input placeholder="Password" type="password" onChange={(e)=>setUser({...user , password : e.target.value})} className="w-full mb-3 p-2 bg-slate-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <select onChange={(e)=> setUser({...user , roleName : e.target.value})} className="w-full mb-4 p-2 bg-slate-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option className="bg-slate-700" value="">Select Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="AUDITOR">AUDITOR</option>
                </select>
                <div>
                    <button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 px-4 py-2 rounded-lg">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModel;
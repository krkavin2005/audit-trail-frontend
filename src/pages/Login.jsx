import { useState } from "react"
import axiosClient from "../api/axiosClient";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [email , setEmail]= useState("");
    const [password , setPassword]= useState("");
    const [warning , setWarning]= useState("");
    const [emailWarning , setEmailWarning]= useState("");
    const [loading , setLoading]= useState(false);
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
        e.preventDefault();
        setEmailWarning("");
        setWarning("");
        if(!email && !password) setWarning("Email ande Password required");
        else if(!password) setWarning("Password required");
        else if(!email) setEmailWarning("Email required");
        else try{
            setLoading(true);
            const res = await login({email , password});
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setEmail("");
        setPassword("");
        setLoading(false);
            navigate("/dashboard");
        }catch(err){
            if(!err.response) setWarning("Server not reachable");
            else if(err.response.status === 401) setWarning("Incorrect username or password");
            else setWarning("Something went wrong")
            console.error(err);
        }
    }
    
    return(
        <div className="flex items-center justify-center w-full min-h-175 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl shadow-purple-900/30 rounded-lg">
            <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl shadow-purple-900/30 w-96">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
                <input type="email" placeholder="Email" className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" value ={email} onChange={(e)=>{setEmail(e.target.value); setEmailWarning(""); setWarning("")}}/>
                {emailWarning && <p className="text-left mb-6 text-red-400">{emailWarning}</p>}
                <input type="password" placeholder="Password" className="w-full border p-3 mb-4 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" value={password} onChange={(e)=>{setPassword(e.target.value); setWarning("")}}/>
                {warning && <p className="text-left mb-6 text-red-400">{warning}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 text-white p-3 rounded-lg font-semibold">{loading ?"Logging in...":"Login"}</button>
            </form>
        </div>
    )
}

export default Login;
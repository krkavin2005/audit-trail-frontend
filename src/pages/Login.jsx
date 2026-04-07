import { useState } from "react"
import axiosClient from "../api/axiosClient";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const [emailWarning, setEmailWarning] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailWarning("");
        setWarning("");
        if (!email && !password) setWarning("Email and password are required");
        else if (!password) setWarning("Password is required");
        else if (!email) setEmailWarning("Email is required");
        else try {
            setLoading(true);
            const res = await login({ email, password });
            localStorage.setItem("token", res.data.token);
            setEmail("");
            setPassword("");
            navigate("/dashboard");
        } catch (err) {
            if (!err.response) setWarning("Server not reachable");
            else if (err.response.status === 401) setWarning("Incorrect email or password");
            else setWarning("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center w-full bg-[#0a0a0f] overflow-hidden selection:bg-purple-500/30">
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen opacity-50 animate-pulse transition-all duration-1000"></div>
                <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-800/20 blur-[100px] mix-blend-screen opacity-50"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[150px] mix-blend-screen opacity-40"></div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-black/50">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 mb-6 shadow-lg shadow-purple-500/30 ring-1 ring-white/20">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Sign in to access Governance</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {warning && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 backdrop-blur-sm">
                                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-200">{warning}</p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg className="w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailWarning(""); setWarning("") }}
                                />
                            </div>
                            {emailWarning && <p className="text-xs text-red-400 pl-1 mt-1 font-medium">{emailWarning}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg className="w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium font-mono tracking-widest"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setWarning("") }}
                                />
                            </div>
                        </div>

                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex items-center justify-center w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-lg shadow-purple-600/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-white/10 hover:scale-[1.02] active:scale-95"
                            >
                                {loading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Sign in to Dashboard"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
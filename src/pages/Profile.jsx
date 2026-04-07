import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyLogs } from "../api/auditApi";
import { getKey } from "../api/reportsApi";
import { chPass } from "../api/authApi";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [logs, setLogs] = useState([]);
    const [fingerprint, setFingerPrint] = useState("");
    const [loading, setLoading] = useState(true);
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
    const [message, setMessage] = useState("");

    const getData = async () => {
        try {
            const res = await getMyLogs(user?._id || user?.userId);
            setLogs(res.data);
            const resp = await getKey();
            setFingerPrint(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        try {
            await chPass(passwords);
            setMessage("Password updated successfully");
            setPasswords({ oldPassword: "", newPassword: "" });
        } catch (err) {
            setMessage(err.response?.data?.message || "Error updating password");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            getData();
        }
    }, [user]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[50vh]">
            <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );

    return (
        <div className="p-6 space-y-6">

            {/* PROFILE */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 shadow-xl">
                <h2 className="text-white text-xl font-bold mb-4">My Profile</h2>

                <p className="text-slate-300 mb-1"><span className="font-semibold text-slate-500">Username:</span> {user?.username}</p>
                <p className="text-slate-400 mb-1"><span className="font-semibold text-slate-500">Email:</span> {user?.email}</p>
                <p className="text-indigo-400 mb-4"><span className="font-semibold text-slate-500">Role:</span> {user?.role}</p>

                <button
                    onClick={logout}
                    className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* ACTIVITY */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-white font-semibold mb-4">Recent Activity</h3>

                <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                    {logs.length === 0 && (
                        <p className="text-slate-400 italic">No activity found</p>
                    )}

                    {logs.map((log, index) => (
                        <div key={index} className="text-sm text-slate-300 border-b border-slate-800/60 pb-3">
                            <p className="font-medium text-slate-200">{log.action}</p>
                            <p className="text-slate-500 text-xs mt-1">
                                {new Date(log.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECURITY */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-white font-semibold mb-4">Security</h3>

                <p className="text-slate-400 text-sm mb-1 font-medium">
                    Public Key Fingerprint:
                </p>

                <div className="bg-black/30 p-3 rounded-lg border border-slate-800 mb-6 font-mono text-sm">
                    <p className="text-emerald-400 break-all">
                        {fingerprint}
                    </p>
                </div>

                {/* Change Password */}
                <div className="space-y-4 max-w-sm">
                    <h4 className="text-slate-300 font-medium mb-2">Change Password</h4>
                    
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={passwords.oldPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, oldPassword: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-white transition-all"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, newPassword: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-white transition-all"
                    />

                    <button
                        onClick={handlePasswordChange}
                        className="bg-indigo-600 hover:bg-indigo-500 font-medium px-5 py-2.5 rounded-lg text-white transition-colors"
                    >
                        Update Password
                    </button>

                    {message && (
                        <p className={`text-sm mt-2 ${message.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
                            {message}
                        </p>
                    )}

                </div>
            </div>

        </div>
    );
};

export default Profile;

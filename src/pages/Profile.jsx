import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyLogs } from "../api/auditApi";
import { getKey } from "../api/reportsApi";
import { chPass } from "../api/authApi";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [logs, setLogs] = useState([]);
    const [fingerprint, setFingerPrint] = useState("");
    const [loading, setLoading] = useStat(true);
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "" });
    const [message, setMessage] = useState("");

    // const getUser =()=>{
    //     const token = localStorage.getItem("token");
    //     if(!token) return null;
    //     try{
    //         const payload = token.split(".")[1];
    //         const decoded = JSON.parse(atob(payload));
    //         return decoded;
    //     }catch(err){
    //         console.error("Invalid token");
    //         return null;
    //     }
    // }

    const getData = async () => {
        const res = await getMyLogs(user._id);
        setLogs(res.data);
        const resp = await getKey();
        setFingerPrint(resp.data);
    };

    const handlePasswordChange = async () => {
        try {
            await chPass(password);
            setMessage("Password updated successfully");
            setPassword({ oldPassword: "", newPassword: "" });
        } catch (err) {
            setMessage(err.response?.data?.message || "Error updating password");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        getData();
    }, []);

    if (loading) return <p className="text-white p-6">Loading...</p>;

    return (
        <div className="p-6 space-y-6">

            {/* PROFILE */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6">
                <h2 className="text-white text-xl font-bold mb-4">My Profile</h2>

                <p className="text-slate-300">Username: {user.username}</p>
                <p className="text-slate-400">Email: {user.email}</p>
                <p className="text-indigo-400">Role: {user.role}</p>

                <button
                    onClick={logout}
                    className="mt-4 px-4 py-2 bg-red-500 rounded text-white"
                >
                    Logout
                </button>
            </div>

            {/* ACTIVITY */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Recent Activity</h3>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {logs.length === 0 && (
                        <p className="text-slate-400">No activity found</p>
                    )}

                    {logs.map((log, index) => (
                        <div key={index} className="text-sm text-slate-300 border-b border-slate-800 pb-2">
                            <p>{log.action}</p>
                            <p className="text-slate-500 text-xs">
                                {new Date(log.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECURITY */}
            <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Security</h3>

                <p className="text-slate-400 text-sm mb-1">
                    Public Key Fingerprint:
                </p>

                <p className="text-green-400 text-sm break-all mb-4">
                    {fingerprint}
                </p>

                {/* Change Password */}
                <div className="space-y-3">

                    <input
                        type="password"
                        placeholder="Old Password"
                        value={passwords.oldPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, oldPassword: e.target.value })
                        }
                        className="w-full p-2 rounded bg-slate-800 text-white"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                            setPasswords({ ...passwords, newPassword: e.target.value })
                        }
                        className="w-full p-2 rounded bg-slate-800 text-white"
                    />

                    <button
                        onClick={handlePasswordChange}
                        className="bg-indigo-600 px-4 py-2 rounded text-white"
                    >
                        Change Password
                    </button>

                    {message && (
                        <p className="text-sm text-slate-400">{message}</p>
                    )}

                </div>
            </div>

        </div>
    );
};

export default Profile;

import { useState } from "react";
import { deactivate, reactivate } from "../api/userApi";
import Detail from "./Detail";
import RoleModal from "./RoleModal";

const UserDetail = (props) => {
    const { closeModel, selectedUser, fetchUsers } = props;
    const [showUpdate, setShowUpdate] = useState(false);

    const deactivateUser = async (userId) => {
        await deactivate(userId);
        fetchUsers();
    };

    const reactivateUser = async (userId) => {
        await reactivate(userId);
        fetchUsers();
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                <div className="bg-grey-900 border border-slate-800 rounded-xl p-6 w-[600px] shadow-2xl shadow-indigo-900/30">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-xl font-bold text-white cursor-pointer`}>Detail</h2>
                        <button onClick={closeModel} className="text-slate-400 hover:text-white">X</button>
                    </div>
                    <Detail doc={selectedUser} />
                    <div className="flex justify-around items-center mt-6">
                        <button onClick={selectedUser.isActive ? deactivateUser : reactivateUser} className={`${selectedUser.isActive ? "bg-red-400" : "bg-green-400"} px-4 py-2 rounded-lg text-white`}>{selectedUser.isActive ? "Deactivate" : "Reactivate"}</button>
                        <button onClick={() => setShowUpdate(true)} className="bg-green-400 px-4 py-2 rounded-lg text-white">Promote</button>
                    </div>
                </div>
            </div>
            {showUpdate && <RoleModal user={selectedUser} close={() => setShowUpdate(false)} refresh={fetchUsers} />}
        </>

    )
}

export default UserDetail;
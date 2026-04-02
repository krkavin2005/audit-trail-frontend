import { useState } from "react"
import { uploadDoc } from "../api/docApi";

const UploadModel =({closeModel , fetch})=>{
    const[file , setFile] =useState(null);
    // const[title , setTitle] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try{
            const res = await uploadDoc(formData);
            console.log(res.data);
            fetch();
            closeModel()
        }catch(err){
            console.error(err);
        }
    };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-grey-900 border border-slate-800 rounded-xl p-6 w-[500px] shadow-2xl shadow-indigo-900/30">
                <div className="flex justify-around align-center mb-6">
                    <h2 className="text-xl font-bold text-white ">Upload Document</h2>
                    <button onClick={closeModel} className="text-slate-600 hover:text-white">X</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                    <input type="file" id="fileInput" onChange={(e)=> setFile(e.target.files[0])} className="hidden"/>
                    <label htmlFor="fileInput" className="w-full cursor-pointer text-slate-300 bg-slate-800 rounded-lg px-3 py-2 text-left">{file ? file.name :"Upload file"}</label>
                    </div>
                    {/* <input type="text" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} className="w-full bg-slate-800 rounded-lg px-3 py-2 text-white"/> */}
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 rounded-lg py-2 text-white">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadModel;
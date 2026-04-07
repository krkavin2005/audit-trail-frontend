import { useState } from "react"
import { uploadDoc } from "../api/docApi";

const UploadModel =({closeModel , fetch})=>{
    const[file , setFile] =useState(null);
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try{
            setLoading(true);
            const res = await uploadDoc(formData);
            console.log(res.data);
            fetch();
            closeModel()
        }catch(err){
            console.error(err);
            setLoading(false);
        }
    };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-[500px] shadow-2xl shadow-indigo-900/30">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white ">Upload Document</h2>
                    <button onClick={closeModel} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <input type="file" id="fileInput" onChange={(e)=> setFile(e.target.files[0])} className="hidden"/>
                        <label htmlFor="fileInput" className="w-full cursor-pointer border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-800/50 rounded-xl px-4 py-8 text-center transition-colors">
                            <div className="flex flex-col items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                <span className="text-slate-300 font-medium">{file ? file.name : "Click to select a file"}</span>
                            </div>
                        </label>
                    </div>
                    <button type="submit" disabled={!file || loading} className="w-full bg-gradient-to-r flex justify-center items-center gap-2 from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg py-3 font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        ) : "Upload Document"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadModel;
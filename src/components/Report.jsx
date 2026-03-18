const Report =({data})=>{
    return(
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-3">
            <h2 className="text-lg font-bold text-white mb-4">Verification Report</h2>
            <p className="text-slate-300"><b>Report Id : </b>{data.reportId}</p>
            <p className="text-slate-300"><b>Verified At : </b>{new Date(data.verifiedAt).toLocaleString()}</p>
            <p className="text-slate-300"><b>Total Records : </b>{data.totalRecords}</p>
            <p className="text-slate-300"><b>Verified By : </b>{data.verifier}</p>
            <p className="text-white font-semibold"><b>Status : </b><span className={data.status === "VALID"?"text-green-400":"text-red-400"}>{data.status}</span></p>
            {data.status ==="TAMPERED"&& (
                <div className="space-y-2 text-red-400">
                    <p><b>Tamper Code : </b>{data.tamperCode}</p>
                    <p><b>Broken At Event : </b>{data.brokenAt}</p>
                    {data.expectedPrevHash &&(
                        <>
                        <p><b>Expected Previous Hash : </b>{data.expectedPrevHash}</p>
                        <p><b>found Previous Hash : </b>{data.foundPrevHash}</p>
                        </>
                    )}
                    {data.expectedHash &&(
                        <>
                        <p><b>Expected Hash : </b>{data.expectedHash}</p>
                        <p><b>Found Hash : </b>{data.foundHash}</p>
                        </>
                    )}
                    {data.presentCount &&(
                        <>
                        <p><b>Expected Count : </b>{data.expectedCount}</p>
                        <p><b>Present Count : </b>{data.presentCount}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Report;
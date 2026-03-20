const Detail = ({ doc }) => {
    return (
        <div className="space-y-3 text-slate-300 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-800">
            <p><b>{doc.originalName}</b></p>
            {Object.keys(doc).map((key) => {
                if (key !== "createdAt" && key !== "updatedAt" && key !== "escalatedAt" && key !== "uploadedBy" && key !== "assignedTo" && key !== "fileHash" && key !== "_id" && key !=="lastLogin") {
                    return (<p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}: </b>{typeof doc[key] === "boolean" ? doc[key].toString().toUpperCase() : doc[key]}</p>)
                }
                else if (key === "uploadedBy" || key === "assignedTo") {
                    return (
                        <>
                            <p><b>{key === "uploadedBy" ? "UploadedBy" : "AssignedTo"}: </b>{doc[key].username}</p>
                            <p><b>Email: </b>{doc[key].email}</p>
                        </>
                    )
                }
            })}
            {Object.keys(doc).map((key) => {
                if (key === "createdAt" || key === "updatedAt" || key === "escalatedAt" || key ==="lastLogin") {
                    return (<p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}: </b>{new Date(doc[key]).toLocaleString()}</p>)
                }
            })}
        </div>
    );
};

export default Detail;
const History = ({ history }) => {
    return (
        <div className="max-h-96 overflow-y-auto space-y-4">
            {history.length === 0 && <p className="text-slate-400">No workflow history</p>}
            {history.map((event, index) => (
                <div key={index} className="flex">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div className="bg-slate-900/60 backdrop-blur p-4 rounded-lg border border-slate-800 w-full">
                        <p className="text-white font-medium">{event.fromState} → {event.toState}</p>
                        <p className="text-slate-400 text-sm">By {event.actedBy.username}</p>
                        {event.comment && (
                            <p className="text-slate-500 text-sm mt-1">Comment : {event.comment}</p>
                        )}
                        <p className="text-slate-500 text-xs mt-2">{new Date(event.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
function SummaryCard({ icon, title, value, color }) {
    return (
        <div className="col-md-3 col-sm-6 mb-3">
            <div className={`card h-100 border-0 shadow-sm`}>
                <div className="card-body d-flex align-items-center gap-3">
                    <div
                        className="rounded p-2"
                        style={{ backgroundColor: color + "22", color }}
                    >
                        {icon}
                    </div>
                    <div>
                        <small className="text-muted">{title}</small>
                        <div className="fw-bold">{value}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SummaryCard;

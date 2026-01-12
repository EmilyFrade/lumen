function AuthCard({ title, subtitle, children, footer }) {
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow-sm" style={{ width: "380px", borderRadius: "14px" }}>
                <div className="card-body p-4">
                    <div className="text-center mb-3">
                        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                            <div className="brand-logo">✨</div>
                            <h5 className="fw-bold mb-0">Lumen</h5>
                        </div>
                        <p className="fw-semibold mb-1">{title}</p>
                        <span className="text-muted-small">{subtitle}</span>
                    </div>

                    {children}

                    {footer && (
                        <div className="text-center mt-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthCard;

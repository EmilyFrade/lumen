import { useAuth } from "../context/AuthContext";

function TopBar() {

    const { user, logout } = useAuth();
    const firstName = user?.name?.split(" ")[0];

    return (
        <nav className="navbar bg-white border-bottom px-4">
            <div className="d-flex align-items-center gap-2">
                <div className="brand-logo">✨</div>
                <div>
                    <div className="fw-bold">Lumen</div>
                    <small className="text-muted">
                        Olá{firstName ? `, ${firstName}` : ""}
                    </small>
                </div>
            </div>

            <button className="btn btn-outline-secondary btn-sm" onClick={logout}>
                Sair
            </button>
        </nav>
    );
}

export default TopBar;

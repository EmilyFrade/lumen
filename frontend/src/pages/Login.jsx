import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/courses");
        } catch {
            setError("Email ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            title="Bem-vindo de volta"
            subtitle="Entre com suas credenciais para acessar seus cursos"
            footer={
                <button
                    className="btn btn-link p-0"
                    onClick={() => navigate("/register")}
                >
                    Não tem conta? Cadastre-se
                </button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    style={{
                        background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                        border: "none"
                    }}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </AuthCard>
    );
}

export default Login;

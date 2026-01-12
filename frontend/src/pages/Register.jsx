import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await register({
                nome: name,
                email,
                senha: password
            });

            setSuccess("Conta criada com sucesso!");
            setTimeout(() => navigate("/"), 1500);
        } catch {
            setError("Erro ao criar conta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            title="Criar sua conta"
            subtitle="Preencha os dados para começar sua jornada de aprendizado"
            footer={
                <button
                    className="btn btn-link p-0"
                    onClick={() => navigate("/")}
                >
                    Já tem conta? Faça login
                </button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    style={{
                        background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                        border: "none"
                    }}
                >
                    {loading ? "Criando..." : "Criar Conta"}
                </button>
            </form>
        </AuthCard>
    );
}

export default Register;

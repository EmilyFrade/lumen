import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import EmptyState from "../components/EmptyState";

function Courses() {

    const courses = [];
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="row mb-3">
                <SummaryCard title="Total de cursos" value="0" icon="📚" color="#6366f1" />
                <SummaryCard title="Em andamento" value="0" icon="📈" color="#2563eb" />
                <SummaryCard title="Concluídos" value="0" icon="✅" color="#16a34a" />
                <SummaryCard title="Nos interesses" value="0" icon="✨" color="#9333ea" />
            </div>

            <div className="card border-0 shadow-sm mb-3">
                <div className="card-body d-flex gap-2">
                    <button className="btn btn-sm btn-light">Todos</button>
                    <button className="btn btn-sm btn-light">Interesse</button>
                    <button className="btn btn-sm btn-light">Em andamento</button>
                    <button className="btn btn-sm btn-light">Concluídos</button>
                </div>

                <div className="card-body d-flex gap-2 flex-wrap">
                    <input
                        className="form-control"
                        placeholder="Buscar cursos por título, descrição ou instrutor..."
                        style={{ flex: "1 1 300px", minWidth: 200 }}
                    />

                    <select className="form-select" style={{ maxWidth: 160, flexShrink: 0 }}>
                        <option>Categoria</option>
                    </select>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/courses/add")}
                        style={{
                            background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                            border: "none"
                        }}
                    >
                        + Adicionar curso
                    </button>
                </div>
            </div>

            {courses.length === 0 && (
                <EmptyState onAdd={() => navigate("/courses/add")} />
            )}

        </MainLayout>
    );
}

export default Courses;

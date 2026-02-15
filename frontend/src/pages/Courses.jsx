import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import EmptyState from "../components/EmptyState";
import CourseCard from "../components/CourseCard";
import DeleteCourseModal from "../components/DeleteCourseModal";
import { getCourses, deleteCourse } from "../services/courseService";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, course: null });
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [courses, statusFilter, searchTerm, categoryFilter]);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error("Erro ao carregar cursos:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        let filtered = [...courses];

        if (statusFilter !== "ALL") {
            filtered = filtered.filter(course => course.status === statusFilter);
        }

        if (categoryFilter !== "ALL") {
            filtered = filtered.filter(course => course.category === categoryFilter);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(term) ||
                (course.description && course.description.toLowerCase().includes(term)) ||
                (course.instructor && course.instructor.toLowerCase().includes(term))
            );
        }

        setFilteredCourses(filtered);
    };

    const handleDeleteClick = (id) => {
        const course = courses.find(c => c.id === id);
        if (course) {
            setDeleteError(null);
            setDeleteModal({ show: true, course });
        }
    };

    const handleDeleteClose = () => {
        if (!deleting) {
            setDeleteModal({ show: false, course: null });
            setDeleteError(null);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.course) return;

        setDeleting(true);
        setDeleteError(null);

        try {
            await deleteCourse(deleteModal.course.id);
            setDeleteModal({ show: false, course: null });
            await loadCourses();
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
            setDeleteError(error.response?.data?.message || "Erro ao excluir curso. Tente novamente.");
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/courses/edit/${id}`);
    };

    const totalCourses = courses.length;
    const inProgress = courses.filter(c => c.status === "IN_PROGRESS").length;
    const completed = courses.filter(c => c.status === "COMPLETED").length;
    const interests = courses.filter(c => c.status === "INTEREST").length;

    const categories = [...new Set(courses.map(c => c.category))];

    const getCategoryLabel = (category) => {
        const labels = {
            TECH: "Tecnologia",
            DESIGN: "Design",
            BUSINESS: "Negócios",
            MARKETING: "Marketing",
            DATA: "Dados",
            PERSONAL_DEVELOPMENT: "Desenvolvimento Pessoal",
            LANGUAGES: "Idiomas"
        };
        return labels[category] || category;
    };

    return (
        <MainLayout>
            <div className="row mb-3">
                <SummaryCard title="Total de cursos" value={totalCourses.toString()} icon="📚" color="#6366f1" />
                <SummaryCard title="Em andamento" value={inProgress.toString()} icon="📈" color="#2563eb" />
                <SummaryCard title="Concluídos" value={completed.toString()} icon="✅" color="#16a34a" />
                <SummaryCard title="Nos interesses" value={interests.toString()} icon="✨" color="#9333ea" />
            </div>

            <div className="card border-0 shadow-sm mb-3">
                <div className="card-body d-flex gap-2 flex-wrap">
                    <button
                        className={`btn btn-sm ${statusFilter === "ALL" ? "btn-primary" : "btn-light"}`}
                        onClick={() => setStatusFilter("ALL")}
                    >
                        Todos
                    </button>
                    <button
                        className={`btn btn-sm ${statusFilter === "INTEREST" ? "btn-primary" : "btn-light"}`}
                        onClick={() => setStatusFilter("INTEREST")}
                    >
                        Interesse
                    </button>
                    <button
                        className={`btn btn-sm ${statusFilter === "IN_PROGRESS" ? "btn-primary" : "btn-light"}`}
                        onClick={() => setStatusFilter("IN_PROGRESS")}
                    >
                        Em andamento
                    </button>
                    <button
                        className={`btn btn-sm ${statusFilter === "COMPLETED" ? "btn-primary" : "btn-light"}`}
                        onClick={() => setStatusFilter("COMPLETED")}
                    >
                        Concluídos
                    </button>
                </div>

                <div className="card-body d-flex gap-2 flex-wrap">
                    <input
                        className="form-control"
                        placeholder="Buscar cursos por título, descrição ou instrutor..."
                        style={{ flex: "1 1 300px", minWidth: 200 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="form-select"
                        style={{ maxWidth: 200, flexShrink: 0 }}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="ALL">Todas as categorias</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                        ))}
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

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : filteredCourses.length === 0 ? (
                <EmptyState onAdd={() => navigate("/courses/add")} />
            ) : (
                <div className="row g-3">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="col-lg-4 col-md-6">
                            <CourseCard
                                course={course}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                            />
                        </div>
                    ))}
                </div>
            )}

            <DeleteCourseModal
                show={deleteModal.show}
                course={deleteModal.course}
                loading={deleting}
                error={deleteError}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />
        </MainLayout>
    );
}

export default Courses;

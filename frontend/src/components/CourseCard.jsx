function CourseCard({ course, onEdit, onDelete }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "IN_PROGRESS":
                return { bg: "#dbeafe", text: "#1e40af" };
            case "COMPLETED":
                return { bg: "#dcfce7", text: "#166534" };
            case "INTEREST":
                return { bg: "#fef3c7", text: "#92400e" };
            default:
                return { bg: "#f3f4f6", text: "#374151" };
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "IN_PROGRESS":
                return "Em Andamento";
            case "COMPLETED":
                return "Concluído";
            case "INTEREST":
                return "Interesse";
            default:
                return status;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "TECH":
                return { bg: "#dbeafe", text: "#1e40af" };
            case "DESIGN":
                return { bg: "#f3e8ff", text: "#7c3aed" };
            case "BUSINESS":
                return { bg: "#fef3c7", text: "#92400e" };
            case "MARKETING":
                return { bg: "#fee2e2", text: "#991b1b" };
            case "DATA":
                return { bg: "#d1fae5", text: "#065f46" };
            case "PERSONAL_DEVELOPMENT":
                return { bg: "#fce7f3", text: "#9f1239" };
            case "LANGUAGES":
                return { bg: "#e0e7ff", text: "#3730a3" };
            default:
                return { bg: "#f3f4f6", text: "#374151" };
        }
    };

    const getCategoryLabel = (category) => {
        switch (category) {
            case "TECH":
                return "Tecnologia";
            case "DESIGN":
                return "Design";
            case "BUSINESS":
                return "Negócios";
            case "MARKETING":
                return "Marketing";
            case "DATA":
                return "Dados";
            case "PERSONAL_DEVELOPMENT":
                return "Desenvolvimento Pessoal";
            case "LANGUAGES":
                return "Idiomas";
            default:
                return category;
        }
    };

    const formatPrice = (paid, price) => {
        if (!paid) return "Gratuito";
        if (price) {
            return `R$ ${parseFloat(price).toFixed(2).replace(".", ",")}`;
        }
        return "Gratuito";
    };

    const statusStyle = getStatusColor(course.status);
    const categoryStyle = getCategoryColor(course.category);

    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                        <h5 className="card-title mb-2 fw-bold">{course.title}</h5>
                        <div className="d-flex gap-2 flex-wrap mb-2">
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: categoryStyle.bg,
                                    color: categoryStyle.text,
                                    fontSize: "0.75rem",
                                    padding: "0.35rem 0.75rem"
                                }}
                            >
                                {getCategoryLabel(course.category)}
                            </span>
                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: statusStyle.bg,
                                    color: statusStyle.text,
                                    fontSize: "0.75rem",
                                    padding: "0.35rem 0.75rem"
                                }}
                            >
                                {getStatusLabel(course.status)}
                            </span>
                        </div>
                    </div>
                </div>

                {course.description && (
                    <p className="text-muted small mb-3" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}>
                        {course.description}
                    </p>
                )}

                <div className="mb-2">
                    <div className="d-flex flex-wrap gap-3 small text-muted mb-2">
                        <span>
                            <strong>Preço:</strong> {formatPrice(course.paid, course.price)}
                        </span>
                        {course.duration && (
                            <span>
                                <strong>Duração:</strong> {course.duration}
                            </span>
                        )}
                        {course.instructor && (
                            <span>
                                <strong>Instrutor:</strong> {course.instructor}
                            </span>
                        )}
                        {course.accessLink && (
                            <span>
                                <strong>Link:</strong>{" "}
                                <a
                                    href={course.accessLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                    style={{ color: "#4f46e5" }}
                                >
                                    Acessar curso
                                </a>
                            </span>
                        )}
                    </div>
                </div>

                {(course.status === "IN_PROGRESS" || course.status === "COMPLETED") && (
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted fw-bold">Progresso</small>
                            <small className="text-muted">{course.progress}%</small>
                        </div>
                        <div className="progress" style={{ height: "8px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: `${course.progress}%`,
                                    backgroundColor: course.status === "COMPLETED" ? "#16a34a" : "#2563eb"
                                }}
                                aria-valuenow={course.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>
                )}

                {course.rating && course.rating > 0 && (
                    <div className="mb-3">
                        <small className="text-muted">
                            <strong>Minha avaliação:</strong>{" "}
                            <span style={{ color: "#fbbf24" }}>
                                {"★".repeat(course.rating)}{"☆".repeat(5 - course.rating)} {course.rating}/5
                            </span>
                        </small>
                    </div>
                )}

                <div className="mt-auto d-flex gap-2 flex-wrap">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onEdit(course.id)}
                        style={{ flex: "1 1 auto", minWidth: "100px" }}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(course.id)}
                        style={{ flex: "1 1 auto", minWidth: "100px" }}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Alert, Card } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import { getCourseById, updateCourse } from "../services/courseService";

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        description: "",
        category: "",
        status: "INTEREST",
        instructor: "",
        duration: "",
        paid: false,
        price: "0",
        accessLink: "",
        modules: []
    });
    const [moduleName, setModuleName] = useState("");
    const [progress, setProgress] = useState(0);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    const [completedModules, setCompletedModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCourse();
    }, [id]);

    const loadCourse = async () => {
        try {
            setLoadingCourse(true);
            const courseData = await getCourseById(id);
            
            const moduleNames = courseData.modules && Array.isArray(courseData.modules)
                ? courseData.modules.map(m => typeof m === 'object' ? m.name : m)
                : [];
            
            setCourse({
                title: courseData.title || "",
                description: courseData.description || "",
                category: courseData.category || "",
                status: courseData.status || "INTEREST",
                instructor: courseData.instructor || "",
                duration: courseData.duration || "",
                paid: courseData.paid || false,
                price: courseData.price ? courseData.price.toString() : "0",
                accessLink: courseData.accessLink || "",
                modules: moduleNames
            });
            
            setProgress(courseData.progress || 0);
            setRating(courseData.rating || 0);
            setNotes(courseData.notes || "");
            
            const totalModules = moduleNames.length;
            const completedCount = totalModules > 0 
                ? Math.round((courseData.progress || 0) / 100 * totalModules)
                : 0;
            
            const completed = [];
            for (let i = 0; i < completedCount && i < totalModules; i++) {
                completed.push(i);
            }
            setCompletedModules(completed);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao carregar curso. Tente novamente.");
        } finally {
            setLoadingCourse(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourse(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleAddModule = () => {
        if (moduleName.trim()) {
            setCourse(prev => {
                const newModules = [...prev.modules, moduleName.trim()];
                const totalModules = newModules.length;
                if (totalModules > 0 && completedModules.length > 0) {
                    const newProgress = Math.round((completedModules.length / totalModules) * 100);
                    setProgress(newProgress);
                }
                return {
                    ...prev,
                    modules: newModules
                };
            });
            setModuleName("");
        }
    };

    const handleRemoveModule = (index) => {
        setCourse(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));

        setCompletedModules(prev => {
            const newCompleted = prev
                .filter(i => i !== index)
                .map(i => i > index ? i - 1 : i);

            const totalModules = course.modules.length - 1;
            if (totalModules > 0) {
                const newProgress = Math.round((newCompleted.length / totalModules) * 100);
                setProgress(newProgress);
            } else {
                setProgress(0);
            }
            return newCompleted;
        });
    };

    const handleProgressChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        const clampedValue = Math.max(0, Math.min(100, value));
        setProgress(clampedValue);
        
        const totalModules = course.modules.length;
        if (totalModules > 0) {
            const completedCount = Math.round(clampedValue / 100 * totalModules);
            const completed = [];
            for (let i = 0; i < completedCount && i < totalModules; i++) {
                completed.push(i);
            }
            setCompletedModules(completed);
        }
    };

    const handleModuleToggle = (index) => {
        setCompletedModules(prev => {
            const isCompleted = prev.includes(index);
            let newCompleted;
            
            if (isCompleted) {
                newCompleted = prev.filter(i => i !== index).sort((a, b) => a - b);
            } else {
                newCompleted = [...prev, index].sort((a, b) => a - b);
            }
            
            const totalModules = course.modules.length;
            if (totalModules > 0) {
                const newProgress = Math.round((newCompleted.length / totalModules) * 100);
                setProgress(newProgress);
            }
            
            return newCompleted;
        });
    };

    const handleRatingClick = (value) => {
        setRating(value === rating ? 0 : value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let updatedStatus = course.status;
            if (progress === 100) {
                updatedStatus = "COMPLETED";
            } else if (progress > 0 && course.status === "INTEREST") {
                updatedStatus = "IN_PROGRESS";
            } else if (progress < 100 && course.status === "COMPLETED") {
                updatedStatus = "IN_PROGRESS";
            }

            const courseData = {
                title: course.title,
                description: course.description || null,
                category: course.category,
                status: updatedStatus,
                instructor: course.instructor || null,
                duration: course.duration || null,
                paid: course.paid,
                price: course.paid && course.price ? parseFloat(course.price) : null,
                accessLink: course.accessLink?.trim() || null,
                modules: course.modules || [],
                progress: progress,
                rating: rating > 0 ? rating : null,
                notes: notes || null
            };

            await updateCourse(id, courseData);
            navigate("/courses");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Erro ao atualizar curso. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/courses");
    };

    if (loadingCourse) {
        return (
            <MainLayout>
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!course || !course.title) {
        return (
            <MainLayout>
                <Alert variant="danger">
                    Curso não encontrado.
                </Alert>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container-fluid px-3 py-2">
                <div className="row">
                    <div className="col-12">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-bottom">
                                <h5 className="mb-0">Editar curso: {course.title}</h5>
                            </Card.Header>

                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-2">
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <div className="row mb-2">
                                        <div className="col-lg-6 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Nome do curso *</Form.Label>
                                                <Form.Control
                                                    name="title"
                                                    value={course.title}
                                                    onChange={handleChange}
                                                    placeholder="Ex: Introdução ao React"
                                                    required
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Categoria *</Form.Label>
                                                <Form.Select
                                                    name="category"
                                                    value={course.category}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="TECH">Tecnologia</option>
                                                    <option value="BUSINESS">Negócios</option>
                                                    <option value="DESIGN">Design</option>
                                                    <option value="MARKETING">Marketing</option>
                                                    <option value="DATA">Dados</option>
                                                    <option value="PERSONAL_DEVELOPMENT">Desenvolvimento Pessoal</option>
                                                    <option value="LANGUAGES">Idiomas</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Status *</Form.Label>
                                                <Form.Select
                                                    name="status"
                                                    value={course.status}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="INTEREST">Interesse</option>
                                                    <option value="IN_PROGRESS">Em andamento</option>
                                                    <option value="COMPLETED">Concluído</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Instrutor/Plataforma</Form.Label>
                                                <Form.Control
                                                    name="instructor"
                                                    value={course.instructor}
                                                    onChange={handleChange}
                                                    placeholder="Ex: Udemy, Maria Silva"
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-lg-6 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Descrição</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    name="description"
                                                    value={course.description}
                                                    onChange={handleChange}
                                                    placeholder="Descreva brevemente o conteúdo do curso..."
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Curso pago</Form.Label>
                                                <Form.Check
                                                    type="switch"
                                                    name="paid"
                                                    checked={course.paid}
                                                    onChange={handleChange}
                                                    label={course.paid ? "Sim" : "Não"}
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Valor Pago (R$)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    name="price"
                                                    value={course.price}
                                                    onChange={handleChange}
                                                    placeholder="0.00"
                                                    disabled={!course.paid}
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-2 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Duração estimada</Form.Label>
                                                <Form.Control
                                                    name="duration"
                                                    value={course.duration}
                                                    onChange={handleChange}
                                                    placeholder="Ex: 10h, 4 semanas"
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-12 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-1 fw-bold">Link de acesso</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    name="accessLink"
                                                    value={course.accessLink}
                                                    onChange={handleChange}
                                                    placeholder="https://..."
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-lg-6 mb-2">
                                            <Form.Label className="mb-2 fw-bold">Progresso do Curso</Form.Label>
                                            <div className="mb-2">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <span className="text-muted small">0%</span>
                                                    <span>{progress}%</span>
                                                    <span className="text-muted small">100%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    className="form-range"
                                                    min="0"
                                                    max="100"
                                                    value={progress}
                                                    onChange={handleProgressChange}
                                                    style={{ height: "4px" }}
                                                />
                                            </div>
                                            <div className="progress" style={{ height: "8px" }}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${progress}%`,
                                                        backgroundColor: progress === 100 ? "#16a34a" : "#2563eb"
                                                    }}
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <Form.Label className="mb-2 fw-bold d-flex align-items-center">
                                                Minha Avaliação
                                            </Form.Label>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        className="btn btn-link p-0 border-0"
                                                        onClick={() => handleRatingClick(value)}
                                                        style={{
                                                            fontSize: "2rem",
                                                            color: value <= rating ? "#fbbf24" : "#d1d5db",
                                                            textDecoration: "none",
                                                            cursor: "pointer",
                                                            lineHeight: 1
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (value > rating) {
                                                                e.target.style.color = "#fcd34d";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (value > rating) {
                                                                e.target.style.color = "#d1d5db";
                                                            }
                                                        }}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                                {rating > 0 && (
                                                    <span className="ms-2 text-muted">
                                                        Você avaliou este curso com {rating} estrela{rating > 1 ? "s" : ""}
                                                    </span>
                                                )}
                                            </div>
                                            {rating > 0 && (
                                                <div className="mt-2">
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        size="sm"
                                                        className="p-0 text-muted"
                                                        onClick={() => setRating(0)}
                                                        style={{ textDecoration: "none", fontSize: "0.875rem" }}
                                                    >
                                                        Remover avaliação
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-lg-6 mb-2">
                                            <Form.Label className="mb-2 fw-bold">Módulos do Curso</Form.Label>
                                            
                                            <div className="d-flex mb-2" style={{ gap: "0.5rem" }}>
                                                <Form.Control
                                                    type="text"
                                                    size="sm"
                                                    value={moduleName}
                                                    onChange={(e) => setModuleName(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleAddModule();
                                                        }
                                                    }}
                                                    placeholder="Adicionar novo módulo..."
                                                    style={{ flex: 1 }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={handleAddModule}
                                                    style={{ minWidth: "40px" }}
                                                >
                                                    +
                                                </Button>
                                            </div>

                                            {course.modules.length > 0 ? (
                                                <div className="d-flex flex-column gap-2">
                                                    {course.modules.map((moduleName, index) => {
                                                        const isCompleted = completedModules.includes(index);
                                                        return (
                                                            <div key={index} className="d-flex align-items-center p-2 border rounded">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    checked={isCompleted}
                                                                    onChange={() => handleModuleToggle(index)}
                                                                    className="me-3"
                                                                    style={{ cursor: "pointer" }}
                                                                />
                                                                <span 
                                                                    style={{ 
                                                                        textDecoration: isCompleted ? "line-through" : "none", 
                                                                        color: isCompleted ? "#6b7280" : "inherit",
                                                                        flex: 1
                                                                    }}
                                                                >
                                                                    {index + 1}. {moduleName}
                                                                </span>
                                                                <Button
                                                                    type="button"
                                                                    variant="link"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveModule(index)}
                                                                    className="text-danger p-0 flex-shrink-0"
                                                                    style={{ textDecoration: "none", fontSize: "0.875rem" }}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-muted small mb-0">Nenhum módulo adicionado ainda. Adicione módulos acima.</p>
                                            )}
                                        </div>

                                        <div className="col-lg-6 mb-2">
                                            <Form.Group>
                                                <Form.Label className="mb-2 fw-bold d-flex align-items-center">
                                                    Minhas Anotações
                                                </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={8}
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Adicione suas anotações sobre este curso..."
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-end" style={{ gap: "0.5rem" }}>
                                                <Button variant="outline-secondary" onClick={handleCancel}>
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={loading}
                                                    style={{
                                                        background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                                                        border: "none"
                                                    }}
                                                >
                                                    {loading ? "Salvando..." : "Salvar Alterações"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default EditCourse;


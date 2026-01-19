import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import { createCourse } from "../services/courseService";

function AddCourse() {
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
        modules: []
    });

    const [moduleName, setModuleName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourse(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleAddModule = () => {
        if (moduleName.trim()) {
            setCourse(prev => ({
                ...prev,
                modules: [...prev.modules, moduleName.trim()]
            }));
            setModuleName("");
        }
    };

    const handleRemoveModule = (index) => {
        setCourse(prev => ({
            ...prev,
            modules: prev.modules.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const courseData = {
                title: course.title,
                description: course.description || null,
                category: course.category,
                status: course.status,
                instructor: course.instructor || null,
                duration: course.duration || null,
                paid: course.paid,
                price: course.paid && course.price ? parseFloat(course.price) : null,
                modules: course.modules || []
            };

            await createCourse(courseData);
            navigate("/courses");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Erro ao criar curso. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/courses");
    };

    return (
        <MainLayout>
            <div className="container-fluid px-3 py-2">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-2">
                            <h5 className="mb-1">Adicionar curso ao gerenciador</h5>
                        </div>

                        {error && (
                            <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-2">
                                {error}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Nome do curso *</Form.Label>
                                        <Form.Control
                                            name="title"
                                            value={course.title}
                                            onChange={handleChange}
                                            placeholder="Ex: Introdução ao React"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-3 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Categoria *</Form.Label>
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

                                <div className="col-lg-3 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Status *</Form.Label>
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
                            </div>

                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Descrição</Form.Label>
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

                                <div className="col-lg-3 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Instrutor/Plataforma</Form.Label>
                                        <Form.Control
                                            name="instructor"
                                            value={course.instructor}
                                            onChange={handleChange}
                                            placeholder="Ex: Udemy, Maria Silva"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-3 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Duração estimada</Form.Label>
                                        <Form.Control
                                            name="duration"
                                            value={course.duration}
                                            onChange={handleChange}
                                            placeholder="Ex: 10h, 4 semanas"
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Curso pago</Form.Label>
                                        <Form.Check
                                            type="switch"
                                            name="paid"
                                            checked={course.paid}
                                            onChange={handleChange}
                                            label={course.paid ? "Sim" : "Não"}
                                        />
                                    </Form.Group>
                                </div>

                                {course.paid && (
                                    <div className="col-lg-3 mb-2">
                                        <Form.Group>
                                            <Form.Label className="mb-1">Valor Pago (R$)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                name="price"
                                                value={course.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                            />
                                        </Form.Group>
                                    </div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-12 mb-2">
                                    <Form.Group>
                                        <Form.Label className="mb-1">Módulos do Curso (Opcional)</Form.Label>
                                        <div className="d-flex mb-1" style={{ gap: "0.5rem" }}>
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
                                                placeholder="Nome do módulo"
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
                                        {course.modules.length > 0 && (
                                            <div className="row mt-1 g-1">
                                                {course.modules.map((module, index) => (
                                                    <div key={index} className="col-md-4 col-lg-3">
                                                        <div
                                                            className="d-flex align-items-center justify-content-between p-1"
                                                            style={{
                                                                backgroundColor: "#f7f5ff",
                                                                borderRadius: "4px"
                                                            }}
                                                        >
                                                            <span className="text-truncate me-1 small">{module}</span>
                                                            <Button
                                                                type="button"
                                                                variant="link"
                                                                size="sm"
                                                                onClick={() => handleRemoveModule(index)}
                                                                className="text-danger p-0 flex-shrink-0"
                                                                style={{ textDecoration: "none", fontSize: "0.75rem" }}
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mt-2">
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
                                            {loading ? "Salvando..." : "Adicionar Curso"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AddCourse;


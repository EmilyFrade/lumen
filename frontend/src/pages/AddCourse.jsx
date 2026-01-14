import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/courses");
    };

    const handleCancel = () => {
        navigate("/courses");
    };

    return (
        <MainLayout>
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white border-bottom">
                            <div>
                                <h5 className="mb-0">Adicionar curso ao gerenciador</h5>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do curso *</Form.Label>
                                    <Form.Control
                                        name="title"
                                        value={course.title}
                                        onChange={handleChange}
                                        placeholder="Ex: Introdução ao React"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="description"
                                        value={course.description}
                                        onChange={handleChange}
                                        placeholder="Descreva brevemente o conteúdo do curso..."
                                    />
                                </Form.Group>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Categoria *</Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={course.category}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Selecione</option>
                                                <option value="TECH">Tecnologia</option>
                                                <option value="BUSINESS">Negócios</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status *</Form.Label>
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
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Instrutor/Plataforma</Form.Label>
                                            <Form.Control
                                                name="instructor"
                                                value={course.instructor}
                                                onChange={handleChange}
                                                placeholder="Ex: Udemy, Maria Silva"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Duração estimada</Form.Label>
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
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Curso pago</Form.Label>
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
                                        <div className="col-md-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Valor Pago (R$)</Form.Label>
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

                                <Form.Group className="mb-3">
                                    <Form.Label>Módulos do Curso (Opcional)</Form.Label>
                                    <div className="d-flex mb-2" style={{ gap: "0.5rem" }}>
                                        <Form.Control
                                            type="text"
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
                                            onClick={handleAddModule}
                                            style={{ minWidth: "45px" }}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    {course.modules.length > 0 && (
                                        <div className="mt-2">
                                            {course.modules.map((module, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex align-items-center justify-content-between mb-2 p-2"
                                                    style={{
                                                        backgroundColor: "#f7f5ff",
                                                        borderRadius: "4px"
                                                    }}
                                                >
                                                    <span>{module}</span>
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        size="sm"
                                                        onClick={() => handleRemoveModule(index)}
                                                        className="text-danger p-0"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        Remover
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.Group>

                                <div className="d-flex justify-content-end mt-4" style={{ gap: "0.5rem" }}>
                                    <Button variant="outline-secondary" onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        style={{
                                            background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                                            border: "none"
                                        }}
                                    >
                                        Adicionar Curso
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}

export default AddCourse;


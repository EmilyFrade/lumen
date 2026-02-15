import { Modal, Button } from "react-bootstrap";

function DeleteCourseModal({ show, course, loading, error, onClose, onConfirm }) {
    return (
        <Modal show={show} onHide={onClose} centered backdrop="static">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="d-flex align-items-center gap-2">
                    <span className="text-danger" style={{ fontSize: "1.5rem" }}>⚠️</span>
                    Excluir curso
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-2">
                {course && (
                    <>
                        <p className="mb-2">
                            Tem certeza que deseja excluir o curso "{course.title}"?
                        </p>
                        <p className="text-muted small mb-0">
                            Esta ação não pode ser desfeita. Todas as informações do curso serão removidas.
                        </p>
                    </>
                )}
                {error && (
                    <div className="alert alert-danger mt-3 mb-0 py-2" role="alert">
                        {error}
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
                <Button variant="outline-secondary" onClick={onClose} disabled={loading}>
                    Cancelar
                </Button>

                <Button variant="danger" onClick={onConfirm} disabled={loading}>
                    {loading ? "Excluindo..." : "Excluir curso"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteCourseModal;

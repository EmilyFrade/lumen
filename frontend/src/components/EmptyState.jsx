function EmptyState({ onAdd }) {
    return (
        <div className="card border-0 shadow-sm mt-4">
            <div className="card-body text-center py-5">
                <p className="text-muted mb-3">
                    Nenhum curso adicionado ainda. <br />
                    Comece adicionando seu primeiro curso!
                </p>

                <button
                    className="btn btn-primary"
                    style={{
                        background: "linear-gradient(90deg, #7c3aed, #4f46e5)",
                        border: "none"
                    }}
                    onClick={onAdd}
                >
                    + Adicionar Curso
                </button>
            </div>
        </div>
    );
}

export default EmptyState;

import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { getCSRFToken } from "../services/csrf";

const Relationship = () => {
    const [modal, setModal] = useState(false);
    const [relationships, setRelationships] = useState([]);
    const [streak, setStreak] = useState([]);
    const [formData, setFormData] = useState({
        estatus: "Good",
        note: "",
        dessert: false,
        username: localStorage.getItem("username"),
    });
    const username = localStorage.getItem("username")
    const toggle = () => setModal(!modal);

    // Obtener relaciones desde la API
    const fetchRelationships = async () => {
        try {
            if (!username) {
                console.error("Username is required");
                return;
            }
    
            const response = await fetch(`http://localhost:8000/api/relationship/?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setRelationships(data.relationships);  // Establecer las relaciones obtenidas
                setStreak(data.streak)
                console.log(data.streak)
            } else {
                console.error("Error al obtener relaciones");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        console.log(formData)
    };

    // Enviar nueva relación a la API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = await getCSRFToken();
            const response = await fetch("http://localhost:8000/api/relationship/post/", {
                method: "POST",
                credentials: "include", // Asegura que se envíen cookies
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,  // Enviar el token CSRF
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toggle();
                fetchRelationships(); // Refrescar lista después de agregar
            } else {
                console.error("Error al enviar la relación");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    useEffect(() => {
        fetchRelationships();
    }, []);

    return (
        <div>

            <h2>Relaciones {username}</h2>
            <Button color="primary" onClick={toggle}>Agregar Relación</Button>
            <h3>Racha: {streak.streak} diá(s)</h3>
            {/* Tabla con las relaciones obtenidas */}
            <Table striped className="mt-3 table">
                <thead>
                    <tr>
                        <th>Creación</th>
                        
                        <th>Nota</th>
                        <th>Postre</th>
                    </tr>
                </thead>
                <tbody>
                {relationships.map((rel) => {
                    // Definir la clase según el estatus
                    let rowClass = "";
                    if (rel.estatus === "Good") rowClass = "table-success";
                    else if (rel.estatus === "Regular") rowClass = "table-warning";
                    else if (rel.estatus === "Bad") rowClass = "table-danger";

                    return (
                        <tr key={rel.id} className={rowClass}>
                        <td>{new Date(rel.create).toLocaleString()}</td>
                        <td>{rel.note || "Sin nota"}</td>
                        <td>{rel.dessert ? "Sí" : "No"}</td>
                    </tr>
                    );
                })}
                </tbody>
            </Table>

            {/* Modal para agregar relación */}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Agregar Relación</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Estatus</label>
                            <select className="form-control" name="estatus" value={formData.estatus} onChange={handleChange}>
                                <option value="Good">Bien</option>
                                <option value="Regular">Regular</option>
                                <option value="Bad">Malo</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nota</label>
                            <textarea className="form-control" name="note" value={formData.note} onChange={handleChange} />
                        </div>

                        <div className="mb-3 form-check">
                            <label className="form-check-label">¿Incluye postre?</label>
                            <input type="checkbox" className="form-check-input" name="dessert" checked={formData.dessert} onChange={handleChange} />
                        </div>

                        <ModalFooter>
                            <Button color="primary" type="submit">Guardar</Button>
                            <Button color="secondary" onClick={toggle}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Relationship;

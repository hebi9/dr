import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { getCSRFToken } from "../services/csrf";

const Finances = () => {
    const [modal, setModal] = useState(false);
    const [finances, setFinances] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        payment_method: "",
        type: "Expense",
        username: localStorage.getItem("username"),
    });

    const toggle = () => setModal(!modal);
    const username = localStorage.getItem("username");

    // Obtener finanzas, categorías y métodos de pago
    const fetchFinances = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/finances/?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setFinances(data.finances);
                setCategories(data.categories || []);
                setPaymentMethods(data.payment_methods || []);
                console.log(data.categories);
            } else {
                console.error("Error al obtener finanzas");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

  
    useEffect(() => {
        fetchFinances();
    }, []);

    // Manejo del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = await getCSRFToken();
            const response = await fetch("http://localhost:8000/api/finances/post/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toggle();
                fetchFinances(); // Refrescar lista después de agregar
            } else {
                console.error("Error al enviar la información");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div>
            <h2>Finanzas {username}</h2>
            <Button color="primary" onClick={toggle}>Agregar Finanzas</Button>

            {/* Tabla de Finanzas */}
            <Table striped className="mt-3">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Método de Pago</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.map((finance) => (
                        <tr key={finance.id}>
                            <td>{new Date(finance.create).toLocaleString()}</td>
                            <td>${finance.amount}</td>
                            <td>{finance.category}</td>
                            <td>{finance.payment_method}</td>
                            <td>{finance.type === "Expense" ? "Gasto" : "Ingreso"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para agregar finanzas */}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Agregar Finanzas</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Monto</label>
                            <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escribe o selecciona"
                                name="category"
                                value={formData.category.name}
                                onChange={handleChange}
                                list="categoriesList"
                                required
                            />
                            <datalist id="categoriesList">
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.name} />
                                ))}
                            </datalist>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Método de Pago</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escribe o selecciona"
                                name="payment_method"
                                value={formData.payment_method.name}
                                onChange={handleChange}
                                list="paymentMethodsList"
                                required
                            />
                            <datalist id="paymentMethodsList">
                                {paymentMethods.map((method, index) => (
                                    <option key={index} value={method.name} />
                                ))}
                            </datalist>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Tipo</label>
                            <select className="form-control" name="type" value={formData.type} onChange={handleChange} required>
                                <option value="Expense">Gasto</option>
                                <option value="Income">Ingreso</option>
                            </select>
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

export default Finances;

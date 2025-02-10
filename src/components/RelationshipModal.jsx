import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const RelationshipModal = ({ isOpen, toggle, formData, setFormData, handleSubmit }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Relación</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                name="create"
                                value={formData.create}

                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estatus</label>
                            <select className="form-control" name="estatus" value={formData.estatus}
                             onChange={handleChange}>
                                <option value="Good">Bien</option>
                                <option value="Regular">Regular</option>
                                <option value="Bad">Malo</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nota</label>
                            <textarea className="form-control" name="note" 
                            value={formData.note} 
                            onChange={handleChange} />
                        </div>

                        <div className="mb-3 form-check">
                            <label className="form-check-label">¿Incluye postre?</label>
                            <input type="checkbox" className="form-check-input" name="dessert" checked={formData.dessert} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Empatía</label>
                            <textarea className="form-control" name="empathy" value={formData.empathy} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Comprensión</label>
                            <textarea className="form-control" name="comprehension" value={formData.comprehension} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Curiosidad</label>
                            <textarea className="form-control" name="curiosity" value={formData.curiosity} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Aprender más </label>
                            <textarea className="form-control" name="learn_more" value={formData.learn_more} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Que aprendí de ti</label>
                            <textarea className="form-control" name="learn_from_you" value={formData.learn_from_you} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Milagro</label>
                            <textarea className="form-control" name="miracle" value={formData.miracle} onChange={handleChange} />
                        </div>
                    <ModalFooter>
                        <Button color="primary" type="submit">Guardar</Button>
                        <Button color="secondary" onClick={toggle}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default RelationshipModal;

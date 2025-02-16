// components/FinanceForm.js
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getCSRFToken } from '../services/csrf';

const FinanceForm = ({ modal, toggle, formData, setFormData, categories, paymentMethods, handleSubmit }) => {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Finanzas</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Monto</label>
                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <input
                            type="text"
                            className="form-control"
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
                        <select
                            className="form-control"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="Expense">Gasto</option>
                            <option value="Income">Ingreso</option>
                        </select>
                    </div>

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
                        <label className="form-label">Nota</label>
                        <textarea
                            className="form-control"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
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

export default FinanceForm;

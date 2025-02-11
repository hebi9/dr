// components/FinanceFilters.js
import React from 'react';

const FinanceFilters = ({ filters, categories, paymentMethods, handleFilterChange, applyFilters }) => {
    return (
        <div className="row text-white">
            <div className="col-3">
                <label className="form-label">Categoría</label>
                <select
                    className="form-control"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-3">
                <label className="form-label">Método de Pago</label>
                <select
                    className="form-control"
                    name="payment_method"
                    value={filters.payment_method}
                    onChange={handleFilterChange}
                >
                    <option value="">Selecciona un método de Pago</option>
                    {paymentMethods.map((method, index) => (
                        <option key={index} value={method.name}>{method.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-3">
                <label className="form-label">Fecha de inicio</label>
                <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="col-3">
                <label className="form-label">Fecha de fin</label>
                <input
                    type="date"
                    className="form-control"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                />
            </div>
            {/* <button className="btn btn-primary col-3" onClick={applyFilters}>Filtrar</button> */}
        </div>
    );
};

export default FinanceFilters;

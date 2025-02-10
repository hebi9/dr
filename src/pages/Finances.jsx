// pages/Finances.js
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { fetchFinancesData, submitFinanceData } from '../services/finances';
import FinanceFilters from '../components/FinanceFilters';
import FinanceForm from '../components/FinanceForm';
import { getCSRFToken } from '../services/csrf';

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
    const [filters, setFilters] = useState({
        category: "",
        payment_method: "",
        start_date: "",
        end_date: ""
    });
    const API_URL = window.location.origin.includes("devtunnels.ms")
                ? "https://250w7qvn-8000.usw3.devtunnels.ms/api/finances/"
                : "http://127.0.0.1:8000/api/finances/";
    const [amountTotal, setAmountTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFinancesData(filters, formData.username, API_URL);
            setFinances(data.finances);
            setCategories(data.categories || []);
            setPaymentMethods(data.payment_methods || []);
            setAmountTotal(data.finances.reduce((total, finance) => total + parseFloat(finance.amount), 0));
        };
        fetchData();
    }, [filters, formData.username]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = () => {
        fetchFinancesData(filters, formData.username, API_URL);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCSRFToken();
        await submitFinanceData(formData, API_URL, csrfToken);
        toggle();  // Close modal after submission
    };
    
    const username = localStorage.getItem("username");

    return (
        <>
            <FinanceFilters
                filters={filters}
                categories={categories}
                paymentMethods={paymentMethods}
                handleFilterChange={handleFilterChange}
                applyFilters={applyFilters}
            />
            <h2>Finanzas {username}</h2>
            <Button color="primary" onClick={toggle}>Agregar Finanzas</Button>
            <h2>Total Finanzas: ${amountTotal}</h2>
            <Table striped className="mt-3">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Categoría</th>
                        <th>Método de Pago</th>
                        <th>Tipo</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.map((finance) => (
                        <tr key={finance.id}>
                            <td>{finance.create}</td>
                            <td>${finance.amount}</td>
                            <td>{finance.category}</td>
                            <td>{finance.payment_method}</td>
                            <td>{finance.type === "Expense" ? "Gasto" : "Ingreso"}</td>
                            <td>{finance.note}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FinanceForm
                modal={modal}
                toggle={toggle}
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                paymentMethods={paymentMethods}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default Finances;

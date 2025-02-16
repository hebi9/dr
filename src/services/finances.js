// services/finances.js
export const fetchFinancesData = async (filters, username, API_URL) => {
    try {
        let url = `${API_URL}?username=${username}`;

        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append("category", filters.category);
        if (filters.payment_method) queryParams.append("payment_method", filters.payment_method);
        if (filters.start_date) queryParams.append("start_date", filters.start_date);
        if (filters.end_date) queryParams.append("end_date", filters.end_date);

        if (queryParams.toString()) {
            url += `&${queryParams.toString()}`;
        }

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Error al obtener finanzas");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const submitFinanceData = async (formData, API_URL, csrfToken) => {
    try {
        const response = await fetch(`${API_URL}post/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Error al enviar la información");
        return response.ok;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

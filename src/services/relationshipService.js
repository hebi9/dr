const API_URL = window.location.origin.includes("devtunnels.ms")
    ? "https://250w7qvn-8000.usw3.devtunnels.ms/api/relationship/"
    : "http://127.0.0.1:8000/api/relationship/";

export async function fetchRelationships(username, relationship = null) {
    try {
        if (!username) throw new Error("Username is required");

        let url = `${API_URL}?username=${username}`;
        if (relationship) url += `&relationship=${relationship}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener relaciones");

        const data = await response.json();
        return relationship ? data.relationships[0] : data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

export async function postRelationship(csrfToken, formData) {
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

        return response.ok;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
}

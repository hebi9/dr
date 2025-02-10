export const getCSRFToken = async () => {
    const API_URL = window.location.origin.includes("devtunnels.ms")
                ? "https://250w7qvn-8000.usw3.devtunnels.ms/api/csrf/"
                : "http://127.0.0.1:8000/api/csrf/";
    const response = await fetch(API_URL, {
        credentials: "include", // Importante para recibir la cookie
    });

    const data = await response.json();
    return data.csrfToken;
};
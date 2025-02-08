export const getCSRFToken = async () => {
    const response = await fetch("http://localhost:8000/api/csrf/", {
        credentials: "include", // Importante para recibir la cookie
    });

    const data = await response.json();
    return data.csrfToken;
};
const API_URL =
  window.location.origin.includes("devtunnels.ms")
    ? "https://250w7qvn-8000.usw3.devtunnels.ms/api/token/"
    : "http://127.0.0.1:8000/api/token/";
export const login = async (username, password) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            return { success: true };
        } else {
            return { success: false, error: "Usuario o contraseña incorrectos" };
        }
    } catch (error) {
        console.error("Error en autenticación:", error);
        return { success: false, error: "Error en la conexión con el servidor" };
    }
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Private Route componente para manejar la redirección
const PrivateRoute = ({ element }) => {
    const { user, loading } = useContext(AuthContext);

    // Si todavía está cargando la información del usuario, no redirige
    if (loading) {
        return <div>Loading...</div>; // Aquí puedes colocar un loading spinner o algo similar
    }

    // Si el usuario no está autenticado, redirige al login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, renderiza el elemento
    return element;
};

export default PrivateRoute;

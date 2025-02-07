import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container } from "reactstrap";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutUser();
        navigate("/login");
    };

    return (
        <Container className="text-center mt-5 ">
            <h2>Bienvenido, {user ? user.username : "Usuario"}!</h2> {/* Aquí se muestra el nombre del usuario */}
            <Button color="danger" onClick={handleLogout}>Cerrar Sesión</Button>
        </Container>
    );
};

export default Dashboard;

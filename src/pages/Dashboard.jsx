import { Outlet } from "react-router-dom"; 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container } from "reactstrap";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import NavBarLayout from "../components/NavBarLayout";



const Dashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutUser();
        navigate("/login");
    };

    return (
        <>
        <Container className="text-center mt-5 ">
            <NavBarLayout />
        </Container>
        <Container className="text-center mt-5 ">
            <Outlet />
        </Container>
        </>
    );
};

export default Dashboard;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBarLayout = () => {
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <Navbar color="dark" dark expand="md" className="mb-4 px-4">
            <NavbarBrand href="/dashboard">Dashboard</NavbarBrand>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/dashboard/finances">Finanzas</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/dashboard/relationship">Relaciones</NavLink>
                </NavItem>
            </Nav>
            <Button color="danger" onClick={handleLogout}>Cerrar Sesión</Button>
        </Navbar>
    );
};

export default NavBarLayout;

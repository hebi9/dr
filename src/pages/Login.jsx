import { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Alert, Card, CardBody, CardTitle } from "reactstrap";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
    
        if (result.success) {
            localStorage.setItem("accessToken", result.token);
            localStorage.setItem("refreshToken", result.refresh);
            localStorage.setItem("username", username); // Aquí se guarda el nombre de usuario
    
            loginUser(result.token, username); // Pasa tanto el token como el username
            navigate("/dashboard"); // Redirigir al Dashboard
        } else {
            setError(result.error);
        }
    };
    

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }}>
                <CardBody>
                    <CardTitle tag="h4" className="text-center">Iniciar Sesión</CardTitle>
                    {error && <Alert color="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">Usuario</Label>
                            <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Contraseña</Label>
                            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </FormGroup>
                        <Button color="primary" block>Iniciar Sesión</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Login;

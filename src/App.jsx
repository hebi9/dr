import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; // Importa el nuevo componente

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    {/* Ruta protegida */}
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    
                    {/* Redirige automáticamente a /dashboard si el usuario está logueado */}
                    <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

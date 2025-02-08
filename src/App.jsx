import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finances from "./pages/Finances";
import Relationship from "./pages/Relationship";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    {/* Ruta protegida */}
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
                        <Route path="finances" element={<Finances />} />
                        <Route path="relationship" element={<Relationship />} />
                    </Route>                    
                    {/* Redirige automáticamente a /dashboard si el usuario está logueado */}
                    <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

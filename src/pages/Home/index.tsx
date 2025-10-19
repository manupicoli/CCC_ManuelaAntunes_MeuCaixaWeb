import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout(); 
        navigate('/login');
    }

    return (
    <div style={{ padding: 20 }}>
        <h1>Bem-vindo, !</h1>
        <button onClick={handleLogout}>Sair</button>
    </div>
    );
}

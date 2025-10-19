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
    <div className="min-h-screen text-center p-20">
        <h1>Bem-vindo!</h1>
        <button 
            className="bg-blue-600 text-white rounded-md p-2 cursor-pointer" 
            onClick={handleLogout}>Sair</button>
    </div>
    );
}

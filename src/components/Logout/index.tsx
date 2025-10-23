import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout(); 
        navigate('/login');
    }

    return (
        <button onClick={handleLogout} className="bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer">Sair</button>
    );
}
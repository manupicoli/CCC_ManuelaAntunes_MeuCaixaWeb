import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleLogout } from "../../services/api/userService";

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    return (
        <button onClick={() => handleLogout(logout, navigate)} className="bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer">Sair</button>
    );
}
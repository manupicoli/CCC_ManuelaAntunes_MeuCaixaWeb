import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserService } from "../../services/api/User/userService";

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    return (
        <button onClick={() => UserService.handleLogout(logout, navigate)} className="bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer">Sair</button>
    );
}
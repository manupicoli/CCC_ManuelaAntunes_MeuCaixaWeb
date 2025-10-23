import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidemenu from "../../components/Sidemenu";
import { useState } from 'react';

export default function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout(); 
        navigate('/login');
    }

    const [collapsed, setCollapsed] = useState(false);
    const expandedWidth = 300;
    const collapsedWidth = 80;

    return (
        <div className="min-h-screen">
            <Sidemenu collapsed={collapsed} 
                      onToggle={() => setCollapsed(c => !c)} 
                      expandedWidth={expandedWidth} 
                      collapsedWidth={collapsedWidth} />

            <div style={{ marginLeft: collapsed ? collapsedWidth : expandedWidth, transition: 'margin-left 200ms ease' }}>
                <div className="flex items-center justify-between p-4">
                    <button onClick={handleLogout} className="bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer">Sair</button>
                </div>

                <div className="p-4">
                    <h1>Bem-vindo!</h1>
                    <p>Conteúdo principal aqui.</p>
                </div>
            </div>
        </div>
    );
}


import { useNavigate } from 'react-router-dom'
import { logout, getTokens, decodeJwtPayload } from '../../services/auth'

export default function Home(){
    const navigate = useNavigate();
    const tokens = getTokens();
    const payload = decodeJwtPayload(tokens?.id_token || tokens?.access_token);
    const name = payload?.preferred_username || payload?.name || payload?.email || '';

    function handleLogout(){
        logout();
        navigate('/login');
    }

    return (
        <div style={{padding: 20}}>
            <h1>Bem-vindo{name ? `, ${name}` : ''}!</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
        return setError('Informe usuário e senha');
    }

    setLoading(true);

    try {
      const response = await loginUser({ username, password });
      setToken(response.access_token);
      navigate('/');
    } catch (err: any) {
      setError('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form'>
        <h2>Login</h2>
          <input 
            placeholder="Usuário" 
            type='text' 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            placeholder="Senha" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <div style={{color: 'crimson'}}>{error}</div>}
      </form>
    </div>
  );
}

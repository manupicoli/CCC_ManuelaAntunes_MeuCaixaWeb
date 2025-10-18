import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
        return setError('Informe usuário e senha');
    }
    setLoading(true);

    try {
      //TODO
      navigate('/');
    } catch (err: any) {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 8, width: 320}}>
        <h2>Login</h2>
          <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          {error && <div style={{color: 'crimson'}}>{error}</div>}
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken, setUserId, setCustomerCode } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
        return setError('Informe usuário e senha');
    }

    setLoading(true);

    try {
      const response = await loginUser({ username, password });      
      setToken(response.accessToken);
      setUserId(response.id);
      setCustomerCode(response.customerCode);
      navigate('/');
    } catch (err: any) {
      setError('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-1 text-center">MeuCaixa</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Acesse sua conta</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="h-11 px-3 border rounded-md"
            placeholder="Usuário"
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="h-11 px-3 border rounded-md"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            className="h-11 bg-blue-600 text-white rounded-md font-semibold cursor-pointer"
            type="submit"
            disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <div className="text-red-500 bg-white p-2 rounded">{error}</div>}
        </form>
      </div>
    </div>
  );
}

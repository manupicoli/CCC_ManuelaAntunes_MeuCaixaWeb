import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";

export default function CategoryDetail() {
const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useCategory(id);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error.message}</div>;
  if (!data) return <div className="p-6 text-gray-600">Categoria não encontrada</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/categorias/${id}/edit`)} className="btn">Editar</button>
          <button onClick={() => navigate(-1)} className="btn-ghost">Voltar</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-gray-700 mb-4">Descrição: {data.description}</p>
        <p className="text-gray-700 mb-4">Padrão do sistema: {data.isDefault ? 'Sim' : 'Não'}</p>
      </div>
    </div>
  );
}
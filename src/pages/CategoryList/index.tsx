import { useMemo } from "react";
import { useCategories } from "../../hooks/useCategories";
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const navigate = useNavigate();
    const request = useMemo(() => ({ page: 0, size: 10 }), []);
    const { data, loading, error } = useCategories(request);

    if (loading) return <div className="p-6">Carregando...</div>;
    if (error) return <div className="p-6 text-red-600">Erro ao carregar categorias</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Categorias</h2>

                <button
                    onClick={() => navigate('/categorias/nova')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Nova Categoria
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="overflow-x-auto"></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm table-auto">
                            <thead>
                                <tr className="text-left text-gray-800 border-b">
                                    <th scope="col" className="py-3 px-2">Título</th>
                                    <th scope="col" className="py-3 px-2">Descrição</th>
                                    <th scope="col" className="flex items-center justify-center py-3 px-2">Padrão</th>
                                    <th scope="col" className="py-3 px-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.content.map((category, idx) => (
                                    <tr key={category.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="py-3 px-2 font-medium">{category.title}</td>
                                        <td className="py-3 px-2 text-gray-600 max-w-xl truncate">{category.description}</td>
                                        <td className="flex py-3 px-2 items-center justify-center">
                                            <input type="checkbox" checked={!!category.isDefault} readOnly/>
                                        </td>
                                        <td className="py-3 px-2">
                                            { !category.isDefault ? <div className="flex items-center gap-2">
                                                <button title="Visualizar" aria-label={`Visualizar ${category.title}`} onClick={() => navigate(`/categorias/${category.id}`)} className="p-2 rounded hover:bg-gray-100 text-gray-600 cursor-pointer">
                                                    <FiEye />
                                                </button>
                                                <button title="Editar" aria-label={`Editar ${category.title}`} onClick={() => navigate(`/categorias/${category.id}/editar`)} className="p-2 rounded hover:bg-blue-50 text-blue-600 cursor-pointer">
                                                    <FiEdit2 />
                                                </button>
                                                <button title="Excluir" aria-label={`Excluir ${category.title}`} onClick={() => console.log('delete', category.id)} className="p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer">
                                                    <FiTrash2 />
                                                </button>
                                            </div> : null }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
}
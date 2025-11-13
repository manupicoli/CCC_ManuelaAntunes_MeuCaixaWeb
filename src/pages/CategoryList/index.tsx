import { useMemo } from "react";
import { useCategories } from "../../hooks/useCategories";
import { FiEye, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
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
                <h2 className="text-2xl font-semibold text-gray-800">Categorias</h2>

                <button
                    onClick={() => navigate("/categorias/nova")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm">
                    Nova Categoria
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-auto border-collapse">
                        <thead>
                            <tr className="text-left text-gray-600 border-b border-gray-200 text-sm tracking-wider">
                                <th className="py-3 px-3 font-bold">Título</th>
                                <th className="py-3 px-3 font-bold">Descrição</th>
                                <th className="py-3 px-3 text-center font-bold">Classificação</th>
                                <th className="py-3 px-3 text-center font-bold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.content.map((category, idx) => (
                                <tr key={category.id}
                                className={`transition ${
                                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } hover:bg-blue-50/30`}>
                                <td className="py-3 px-3 font-medium text-gray-800">{category.title}</td>
                                <td className="py-3 px-3 text-gray-600 max-w-xl truncate">
                                    {category.description || "—"}
                                </td>
                                <td className="py-3 px-3 text-center">
                                    {category.isDefault ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                                        <FiStar className="w-3 h-3" />
                                        Padrão
                                    </span>
                                    ) : (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
                                        Personalizada
                                    </span>
                                    )}
                                </td>
                                <td className="py-3 px-3 text-center">
                                    {!category.isDefault && (
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                        title="Visualizar"
                                        aria-label={`Visualizar ${category.title}`}
                                        onClick={() => navigate(`/categorias/${category.id}`)}
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer transition"
                                        >
                                        <FiEye />
                                        </button>
                                        <button
                                        title="Editar"
                                        aria-label={`Editar ${category.title}`}
                                        onClick={() => navigate(`/categorias/${category.id}/editar`)}
                                        className="p-2 rounded-full hover:bg-blue-100 text-blue-600 cursor-pointer transition"
                                        >
                                        <FiEdit2 />
                                        </button>
                                        <button
                                        title="Excluir"
                                        aria-label={`Excluir ${category.title}`}
                                        onClick={() => console.log("delete", category.id)}
                                        className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer transition"
                                        >
                                        <FiTrash2 />
                                        </button>
                                    </div>
                                    )}
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
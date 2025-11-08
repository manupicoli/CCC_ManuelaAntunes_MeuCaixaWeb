import { useMemo } from "react";
import { useCategories } from "../../hooks/useCategories";

export default function Category() {
    const request = useMemo(() => ({ page: 0, size: 10 }), []);
    const { data, loading, error } = useCategories(request);

    if (loading) return <div className="p-6">Carregando...</div>;
    if (error) return <div className="p-6 text-red-600">Erro ao carregar categorias</div>;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Categorias</h2>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="overflow-x-auto"></div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-800">
                            <th className="py-2">Título</th>
                            <th className="py-2">Descrição</th>
                            <th className="py-2">Padrão do sistema</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.content.map((category) => (
                            <tr key={category.id}>
                                <td className="py-3">{category.title}</td>
                                <td className="py-3">{category.description}</td>
                                <td className="py-3"><input type="checkbox" checked={category.isDefault} readOnly /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
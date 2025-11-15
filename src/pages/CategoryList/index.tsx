import { useState } from "react";
import { useCategories } from "../../hooks/Category/useCategories";
import { FiEye, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../../services/api/Category/categoryService";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal";

export default function CategoryList() {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const { data, loading, error, reload } = useCategories({ page, size: 10 });

    const { token } = useAuth();

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [alertData, setAlertData] = useState({
        open: false,
        type: "success" as "success" | "error" | "warning",
        title: "",
        message: "",
    });

    const handleDeleteClick = (id: string) => {
        setSelectedCategoryId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedCategoryId) return;

        try {
            await CategoryService.deleteCategory({ id: selectedCategoryId, token: token! });
            setAlertData({
                open: true,
                type: "success",
                title: "Categoria excluída",
                message: "A categoria foi excluída com sucesso.",
            });

            reload();
        } catch (error) {
            setAlertData({
                open: true,
                type: "error",
                title: "Erro ao excluir",
                message: "Não foi possível excluir a categoria.",
            });
        } finally {
            setShowConfirmModal(false);
            setSelectedCategoryId(null);
        }
    };

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
                                        onClick={() => handleDeleteClick(category.id)}
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

            {data && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            disabled={page === 0}
                            className={`px-3 py-2 transition cursor-pointer
                                ${page === 0
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:bg-gray-100 cursor-pointer"}`}>
                        <FaChevronLeft />
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: data.page.totalPages }, (_, i) => (
                            <button key={i}
                                    onClick={() => setPage(i)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm transition cursor-pointer ${
                                        i === page
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "hover:bg-gray-100"}`}>
                                {i + 1}
                            </button>))}
                    </div>

                    <button onClick={() => setPage(prev => Math.min(prev + 1, data.page.totalPages - 1))}
                            disabled={page + 1 >= data.page.totalPages}
                            className={`px-3 py-2 transition cursor-pointer 
                                ${page + 1 >= data.page.totalPages
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:bg-gray-100 cursor-pointer"}`}>
                        <FaChevronRight />
                    </button>
                </div>
            )}

            {showConfirmModal && (
                <AlertModal
                    open={showConfirmModal}
                    type="warning"
                    title="Confirmar exclusão"
                    message="Tem certeza que deseja excluir esta categoria?"
                    onClose={() => setShowConfirmModal(false)}
                >
                <div className="flex justify-center gap-4 mt-4">
                    <button
                    onClick={confirmDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                    >
                    Sim, excluir
                    </button>
                    <button
                    onClick={() => setShowConfirmModal(false)}
                    className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                    Cancelar
                    </button>
                </div>
                </AlertModal>
            )}

            <AlertModal
                open={alertData.open}
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                onClose={() => setAlertData({ ...alertData, open: false })}
            />
        </div>
  );
}
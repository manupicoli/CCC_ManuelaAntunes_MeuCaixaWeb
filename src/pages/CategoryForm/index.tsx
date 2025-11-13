import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { CategoryService } from "../../services/api/categoryService";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal";

type CategoryFormProps = {
  mode: "create" | "view" | "edit";
};

export default function CategoryForm({ mode }: CategoryFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isDefault: false,
  });

  const [alertData, setAlertData] = useState({
    open: false,
    type: "success" as "success" | "error" | "warning",
    title: "",
    message: "",
  });

  const { data, loading, error } = useCategory(id);

  const isEditable = mode !== "view";

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description ? data.description : "",
        isDefault: data.isDefault ? data.isDefault : false,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    const fieldValue =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await CategoryService.createCategory({
          title: formData.title,
          description: formData.description,
          token: token!,
        });
      } else if (mode === "edit") {
        await CategoryService.updateCategory({
          id: id!,
          title: formData.title,
          description: formData.description,
          token: token!,
        });
      }

      setAlertData({
        open: true,
        type: "success",
        title: "Sucesso!",
        message: "Categoria salva com sucesso.",
      });
    } catch (err) {
      setAlertData({
        open: true,
        type: "error",
        title: "Erro",
        message: "Ocorreu um erro ao salvar a categoria.",
      });
    }
  };

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          {mode === "create"
            ? "Nova Categoria"
            : isEditable
            ? "Editar Categoria"
            : "Detalhes da Categoria"}
        </h1>
        <div className="flex gap-2">
          {mode === "view" && (
            <button
              onClick={() => navigate(`/categorias/${id}/editar`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Editar
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-2">
          {formData.isDefault ? (
            <span className="inline-flex items-center gap-1 text-base font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                <FiStar className="w-3 h-3" />
                Padrão
            </span>
            ) : (
            <span className="inline-flex items-center gap-1 text-base font-semibold text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
                Personalizada
            </span>
            )}
        </div>

        {isEditable && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Salvar
          </button>
        )}
      </form>

        <AlertModal
          open={alertData.open}
          type={alertData.type}
          title={alertData.title}
          message={alertData.message}
          onClose={() => {
            setAlertData((prev) => ({ ...prev, open: false }));
            if (alertData.type === "success") {
              navigate("/categorias");
            }
          }}
        />
    </div>
  );
}
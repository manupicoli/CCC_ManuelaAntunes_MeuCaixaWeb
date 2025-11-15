import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AlertModal from "../../components/AlertModal";
import { useAuth } from "../../context/AuthContext";
import { FinancialRecordService } from "../../services/api/FinancialRecord/financialRecordService";
import { useCategories } from "../../hooks/Category/useCategories";
import { useFinancialRecord } from "../../hooks/FinancialRecord/useFinancialRecord";
import type { FinancialRecordType } from "../../services/api/FinancialRecord/financialRecordService";

type FinancialRecordFormProps = {
  mode: "create" | "view" | "edit";
};

export default function FinancialRecordForm({ mode }: FinancialRecordFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, customerCode } = useAuth();

  const [formData, setFormData] = useState({
    type: "EXPENSE" as FinancialRecordType[keyof FinancialRecordType],
    amount: 0,
    dueDate: "",
    paymentDate: "",
    description: "",
    category: "",
  });

  const [alertData, setAlertData] = useState({
    open: false,
    type: "success" as "success" | "error" | "warning",
    title: "",
    message: "",
  });

  const { data, loading, error } = useFinancialRecord(id);
  const { data: categories } = useCategories({ page: 0, size: 999 });

  const isEditable = mode !== "view";

  useEffect(() => {
    if (data) {
      setFormData({
        type: data.type,
        amount: data.amount ?? 0,
        dueDate: data.dueDate ? data.dueDate.substring(0, 16) : "",
        paymentDate: data.paymentDate ? data.paymentDate.substring(0, 16) : "",
        description: data.description ?? "",
        category: data.categoryId?.toString() ?? "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      } as typeof prev;

      if (name === "type") {
        if (value === "INCOME") {
          next.dueDate = "";
        } else if (value === "EXPENSE") {
          next.paymentDate = "";
        }
      }

      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await FinancialRecordService.createFinancialRecord({
          token: token!,
          customerCode: customerCode!,
          type: formData.type,
          amount: formData.amount,
          dueDate: formData.dueDate || null,
          paymentDate: formData.paymentDate || null,
          description: formData.description,
          category: formData.category,
        });
      } else if (mode === "edit") {
        await FinancialRecordService.updateFinancialRecord({
            id: id!,
            token: token!,
            customerCode: customerCode!,
            type: formData.type,
            amount: formData.amount,
            dueDate: formData.dueDate || null,
            paymentDate: formData.paymentDate || null,
            description: formData.description,
            category: formData.category,
        });
      }

      setAlertData({
        open: true,
        type: "success",
        title: "Sucesso!",
        message: "Registro financeiro salvo com sucesso.",
      });
    } catch (err) {
      setAlertData({
        open: true,
        type: "error",
        title: "Erro",
        message: "Ocorreu um erro ao salvar o registro.",
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
            ? "Novo Registro"
            : isEditable
            ? "Editar Registro"
            : "Detalhes do Registro"}
        </h1>

        <div className="flex gap-2">
          {mode === "view" && (
            <button
              onClick={() => navigate(`/registros-financeiros/${id}/editar`)}
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
          <label className="block text-gray-700 mb-1">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
          >
            <option value="EXPENSE">Despesa</option>
            <option value="INCOME">Receita</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Valor</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
          >
            <option value="">Selecione</option>
            {categories?.content.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {formData.type !== "INCOME" && (
            <div>
              <label className="block text-gray-700 mb-1">Data de Vencimento</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>
          )}

          {formData.type !== "EXPENSE" && (
            <div>
              <label className="block text-gray-700 mb-1">Data de Pagamento</label>
              <input
                type="datetime-local"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full border rounded-lg px-3 py-2 disabled:bg-gray-100"
              />
            </div>
          )}
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
            navigate("/registros-financeiros");
          }
        }}
      />
    </div>
  );
}
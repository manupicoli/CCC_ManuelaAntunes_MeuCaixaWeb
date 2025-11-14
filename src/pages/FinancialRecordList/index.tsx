import { useState } from "react";
import { useFinancialRecords } from "../../hooks/FinancialRecord/useFinancialRecords";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FinancialRecordService } from "../../services/api/financialRecordService";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal";

export default function FinancialRecordList() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const { data, loading, error, reload } = useFinancialRecords({ page, size: 10 });
  const { token } = useAuth();

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [alertData, setAlertData] = useState({
    open: false,
    type: "success" as "success" | "error" | "warning",
    title: "",
    message: "",
  });

  const handleDeleteClick = (id: string) => {
    setSelectedRecordId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecordId) return;

    try {
      await FinancialRecordService.deleteFinancialRecord({ id: selectedRecordId, token: token! });

      setAlertData({
        open: true,
        type: "success",
        title: "Registro excluído",
        message: "O registro financeiro foi excluído com sucesso.",
      });

      reload();
    } catch (error) {
      setAlertData({
        open: true,
        type: "error",
        title: "Erro ao excluir",
        message: "Não foi possível excluir o registro financeiro.",
      });
    } finally {
      setShowConfirmModal(false);
      setSelectedRecordId(null);
    }
  };

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">Erro ao carregar registros financeiros</div>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Registros Financeiros</h2>

        <button
          onClick={() => navigate("/registros-financeiros/novo")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-sm"
        >
          Novo Registro
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b border-gray-200 text-sm tracking-wider">
                <th className="py-3 px-3 font-bold">Tipo</th>
                <th className="py-3 px-3 font-bold">Valor</th>
                <th className="py-3 px-3 font-bold">Categoria</th>
                <th className="py-3 px-3 font-bold">Vencimento</th>
                <th className="py-3 px-3 font-bold">Pagamento</th>
                <th className="py-3 px-3 font-bold">Descrição</th>
                <th className="py-3 px-3 text-center font-bold"></th>
              </tr>
            </thead>

            <tbody>
              {data?.content.map((record, idx) => (
                <tr
                  key={record.id}
                  className={`transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50/30`}
                >
                  <td className="py-3 px-3 font-medium text-gray-800">
                    {record.type === "INCOME" ? (
                      <span className="text-green-700 font-semibold">Entrada</span>
                    ) : (
                      <span className="text-red-700 font-semibold">Saída</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-gray-800">
                    R$ {record.amount.toFixed(2)}
                  </td>

                  <td className="py-3 px-3 text-gray-700">
                    {record.categoryTitle || "—"}
                  </td>

                  <td className="py-3 px-3 text-gray-700">
                    {record.dueDate ? new Date(record.dueDate).toLocaleDateString() : "—"}
                  </td>

                  <td className="py-3 px-3 text-gray-700">
                    {record.paymentDate
                      ? new Date(record.paymentDate).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="py-3 px-3 text-gray-600 truncate max-w-xl">
                    {record.description || "—"}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        title="Visualizar"
                        onClick={() => navigate(`/registros-financeiros/${record.id}`)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer transition"
                      >
                        <FiEye />
                      </button>

                      <button
                        title="Editar"
                        onClick={() => navigate(`/registros-financeiros/${record.id}/editar`)}
                        className="p-2 rounded-full hover:bg-blue-100 text-blue-600 cursor-pointer transition"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        title="Excluir"
                        onClick={() => handleDeleteClick(record.id)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`px-3 py-2 transition cursor-pointer ${
              page === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <FaChevronLeft />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: data.page.totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm transition cursor-pointer ${
                  i === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, data.page.totalPages - 1))
            }
            disabled={page + 1 >= data.page.totalPages}
            className={`px-3 py-2 transition cursor-pointer ${
              page + 1 >= data.page.totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {showConfirmModal && (
        <AlertModal
          open={showConfirmModal}
          type="warning"
          title="Confirmar exclusão"
          message="Tem certeza que deseja excluir este registro?"
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

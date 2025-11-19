import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ReportService } from "../../services/api/Report/reportService";
import { ApiException } from "../../services/api/ApiException";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ExportReportModal({ open, onClose }: Props) {
  const { token } = useAuth();
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleExport = async () => {
    if (!token) return;
    if (!start || !end) return alert("Escolha data inicial e final");

    setLoading(true);
    try {
      const res = await ReportService.exportReport({ token, customStart: start, customEnd: end });

      if (res instanceof ApiException) {
        alert(res.message || "Erro ao exportar");
        return;
      }

      const blob = res as Blob;
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${start}_to_${end}.pdf`;

      document.body.appendChild(a);

      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao exportar relatório");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Exportar Relatório</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Data início</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Data fim</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded cursor-pointer">Cancelar</button>
          <button
            onClick={handleExport}
            disabled={loading}
            className={`px-3 py-2 rounded text-white cursor-pointer ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Exportando...' : 'Exportar'}
          </button>
        </div>
      </div>
    </div>
  );
}

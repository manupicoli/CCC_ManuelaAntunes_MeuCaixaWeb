import { CgLoadbarSound } from "react-icons/cg";

type Props = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyChart({
  title = "Sem dados",
  message = "Nenhum dado disponível para o período selecionado.",
  actionLabel,
  onAction,
}: Props) {
  return (
    <div role="status" aria-live="polite" className="w-full h-64 flex flex-col items-center justify-center p-4 text-center text-gray-600">
      <div className="w-20 h-20 mb-3 text-gray-300">
        <CgLoadbarSound size={80} />
      </div>

      <div className="font-medium text-gray-800">{title}</div>
      <div className="mt-1 text-xs">{message}</div>

      {actionLabel && onAction && (
        <button onClick={onAction} className="mt-3 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 cursor-pointer transition">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

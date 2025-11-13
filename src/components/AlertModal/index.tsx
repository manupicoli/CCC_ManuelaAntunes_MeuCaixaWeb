interface AlertModalProps {
  open: boolean;
  type?: "success" | "error" | "warning";
  title: string;
  message: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function AlertModal({
  open,
  type = "success",
  title,
  message,
  onClose,
  children
}: AlertModalProps) {
  if (!open) return null;

  const colorClasses =
    type === "success"
      ? "text-green-600 border-green-200 bg-green-50"
      : type === "error"
      ? "text-red-600 border-red-200 bg-red-50"
      : "text-yellow-600 border-yellow-200 bg-yellow-50";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center border ${colorClasses}`}
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-700">{message}</p>

          {children 
            ? <div className="modal-footer">{children}</div> 
            : <button onClick={onClose}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                OK
              </button>}
        </div>
      </div>
    </div>
  );
}

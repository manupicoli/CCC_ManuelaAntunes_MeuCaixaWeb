import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import type { FinancialRecord } from "../../models/financialrecord";

export interface FinancialRecordInterface {
    content: FinancialRecord;
    handleDeleteClick?: (id: string) => void;
    navigate: (path: string) => void;
}

export default function FinancialRecordCard(props: FinancialRecordInterface) {
    return (
        <>
            <td className="py-3 px-3 font-medium text-gray-700">
                {props.content.dueDate != null 
                    ? new Date(props.content.dueDate).toLocaleDateString() 
                    : new Date(props.content.paymentDate).toLocaleDateString()}
            </td>
            <td className="py-3 px-3 font-medium text-gray-700">
                {props.content.type === "INCOME" ? (
                    <span className="text-green-700 font-semibold">Entrada</span>
                ) : (
                    <span className="text-red-700 font-semibold">Saída</span>
                )}
            </td>
            <td className="py-3 px-3 font-medium text-gray-700">{props.content.categoryTitle}</td>
            <td className="py-3 px-3 font-medium text-gray-700">R$ {props.content.amount.toFixed(2)}</td>
            <td className="py-3 px-3 text-gray-700 truncate max-w-xl">{props.content.description || "-"}</td>
            <td className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-3">
                    <button
                        title="Visualizar"
                        onClick={() => props.navigate(`/registros-financeiros/${props.content.id}`)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer transition"
                        >
                        <FiEye />
                        </button>

                        <button
                        title="Editar"
                        onClick={() => props.navigate(`/registros-financeiros/${props.content.id}/editar`)}
                        className="p-2 rounded-full hover:bg-blue-100 text-blue-600 cursor-pointer transition"
                        >
                        <FiEdit2 />
                        </button>

                        {props.handleDeleteClick && (
                            <button
                                title="Excluir"
                                onClick={() => props.handleDeleteClick?.(props.content.id)}
                                className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer transition"
                            >
                            <FiTrash2 />
                            </button>
                        )}
                    </div>
                </td>
        </>
    );
}


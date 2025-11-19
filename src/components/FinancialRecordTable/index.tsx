import type { FinancialRecord } from "../../models/financialrecord";
import FinancialRecordCard from "../FinancialRecordCard";
import { GrTransaction } from "react-icons/gr";

interface FinancialRecordTableInterface {
    records: FinancialRecord[];
    handleDeleteClick?: (id: string) => void;
    navigate: (path: string) => void;
};

export default function FinancialRecordTable(props: FinancialRecordTableInterface) {
    return (
        <>
            <table className="w-full text-sm table-auto border-collapse">
                <thead>
                    <tr className="text-left text-gray-800 border-b border-gray-200 text-sm tracking-wider">
                        <th className="py-3 px-3 font-bold">Data</th>
                        <th className="py-3 px-3 font-bold">Tipo</th>
                        <th className="py-3 px-3 font-bold">Categoria</th>
                        <th className="py-3 px-3 font-bold">Valor</th>
                        <th className="py-3 px-3 font-bold">Descrição</th>
                        <th className="py-3 px-3 font-bold text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.records.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-12 px-3">
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="text-gray-300 w-16 h-16">
                                        <GrTransaction size={48} />
                                    </div>

                                    <div className="text-center text-gray-600">
                                        <div className="font-medium">Nenhum registro financeiro encontrado</div>
                                        <div className="text-sm mt-1">Adicione seu primeiro registro para começar a controlar suas finanças.</div>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => props.navigate('/registros-financeiros/novo')}
                                            className="mt-3 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer transition"
                                        >
                                            Novo registro financeiro
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        props.records.map((record, index) => (
                            <tr key={index} 
                                className={`transition ${index % 2 === 0 
                                    ? "bg-white" : "bg-gray-50"} 
                                    hover:bg-blue-50/30`}>
                                <FinancialRecordCard content={record} handleDeleteClick={props.handleDeleteClick} navigate={props.navigate} />
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
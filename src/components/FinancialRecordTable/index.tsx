import type { FinancialRecord } from "../../models/financialrecord";
import FinancialRecordCard from "../FinancialRecordCard";

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
                    {props.records.map((record, index) => (
                        <tr key={index} 
                            className={`transition ${index % 2 === 0 
                                ? "bg-white" : "bg-gray-50"} 
                                hover:bg-blue-50/30`}>
                            <FinancialRecordCard content={record} handleDeleteClick={props.handleDeleteClick} navigate={props.navigate} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
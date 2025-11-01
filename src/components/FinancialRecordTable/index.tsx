import type { FinancialRecordInterface } from "../FinancialRecordCard";
import FinancialRecordCard from "../FinancialRecordCard";

interface FinancialRecordTableInterface {
    records: FinancialRecordInterface[];
};

export default function FinancialRecordTable(props: FinancialRecordTableInterface) {
    return (
        <>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-600">
                        <th className="py-2">Data</th>
                        <th className="py-2">Tipo</th>
                        <th className="py-2">Categoria</th>
                        <th className="py-2">Valor</th>
                        <th className="py-2">Descrição</th>
                        <th className="py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.records.map((record, index) => (
                        <tr key={index} className="border-t">
                            <FinancialRecordCard {...record} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export interface FinancialRecordInterface {
  date: string;
  type: 'Entrada' | 'Saída';
  category: string;
  value: string;
  description: string;
}

export default function FinancialRecordCard(props: FinancialRecordInterface) {
    return (
        <>
            <td className="py-3">{props.date}</td>
            <td className="py-3">{props.type}</td>
            <td className="py-3">{props.category}</td>
            <td className="py-3">{props.value}</td>
            <td className="py-3 text-gray-600">{props.description}</td>
            <td className="py-3">
                <div className="flex gap-2">
                    <button className="px-2 py-1 border rounded text-sm">Editar</button>
                    <button className="px-2 py-1 border rounded text-sm">Excluir</button>
                </div>
            </td>
        </>
    );
}


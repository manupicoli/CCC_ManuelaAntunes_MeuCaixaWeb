import FinancialRecordTable from "../../components/FinancialRecordTable";
import SummaryCard from "../../components/SummaryCard";

type RecordItem = {
    date: string;
    type: 'Entrada' | 'Saída';
    category: string;
    value: string;
    description: string;
};

const mockSummary = [
    { title: 'Saldo Atual', value: 'R$ 12.345,67' },
    { title: 'R$ Total de Entradas', value: 'R$ 20.000,00' },
    { title: 'R$ Total de Saídas', value: 'R$ 7.654,33' },
    { title: 'Vencimentos Próximos', value: '3' },
];

const mockRecords: RecordItem[] = Array.from({ length: 6 }).map((_, i) => ({
    date: `2025-10-${10 + i}`,
    type: i % 2 === 0 ? 'Entrada' : 'Saída',
    category: ['Salário', 'Internet', 'Aluguel', 'Lazer', 'Mercado', 'Transporte'][i % 6],
    value: (i % 2 === 0 ? 'R$ 1.200,00' : 'R$ 120,00'),
    description: `Descrição exemplo ${i + 1}`,
}));

function PlaceholderDonut() {
    return (
        <div className="w-full h-48 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
                <div className="w-24 h-24 rounded-full bg-white" />
            </div>
        </div>
    );
}

function PlaceholderBarChart() {
    return (
        <div className="w-full h-48 flex items-end gap-3 px-4">
            {[1, 2, 3, 4, 5].map((h) => (
                <div key={h} className={`flex-1 bg-gray-200 rounded-t-md`} style={{ height: `${h * 14 + 20}px` }} />
            ))}
        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>Perfil</span>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">👤</div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {mockSummary.map((s) => (
                    <SummaryCard key={s.title} title={s.title} value={s.value} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-lg font-medium mb-4">Categorias</div>
                    <PlaceholderDonut />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-lg font-medium mb-4">Movimentações por Mês</div>
                    <PlaceholderBarChart />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-lg font-medium mb-4">Últimas Movimentações</div>
                <div className="overflow-x-auto"></div>
                <FinancialRecordTable records={mockRecords} />
            </div>
        </div>
    );
}

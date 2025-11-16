import { useNavigate } from "react-router-dom";
import FinancialRecordTable from "../../components/FinancialRecordTable";
import SummaryCard from "../../components/SummaryCard";
import { useFinancialRecords } from "../../hooks/FinancialRecord/useFinancialRecords";
import { useDashboard } from "../../hooks/Dashboard/useDashboard";
import CategoryDonutChart from "../../components/CategoryDonutChart";
import MonthlyBarChart from "../../components/MonthlyBarChart";
import { CgProfile } from "react-icons/cg";

export default function Dashboard() {
    const { data, loading, error } = useFinancialRecords({ page: 0, size: 10 });
    const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useDashboard();

    const summaryCards = [
        { title: 'Saldo Atual', value: dashboardData ? `R$ ${dashboardData.currentAmount.toFixed(2)}` : 'R$ 0,00' },
        { title: 'Total de Entradas', value: dashboardData ? `R$ ${dashboardData.totalIncome.toFixed(2)}` : 'R$ 0,00' },
        { title: 'Total de Saídas', value: dashboardData ? `R$ ${dashboardData.totalExpense.toFixed(2)}` : 'R$ 0,00' },
        { title: 'Vencimentos Próximos', value: dashboardData ? `${dashboardData.nextIncomeQuantity}` : '0' },
    ];

    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <button className="pr-2 cursor-pointer">
                        <CgProfile size={35} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {summaryCards.map((s) => (
                    <SummaryCard key={s.title} title={s.title} value={s.value} />
                ))}
            </div>

            {dashboardError ? <div className="text-red-600">Erro ao carregar dados do dashboard</div> 
                : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-4">Categorias</div>
                        {dashboardLoading || !dashboardData ? (
                            <div>Carregando...</div>
                        ) : (
                            <CategoryDonutChart data={dashboardData.categorySummary} />
                        )}

                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-4">Movimentações por Mês</div>
                        {dashboardLoading || !dashboardData ? (
                            <div>Carregando...</div>
                        ) : (
                            <MonthlyBarChart data={dashboardData.monthlySummary} />
                        )}

                    </div>
                </div>}

            {error ? <div className="text-red-600">Erro ao carregar registros financeiros</div>
                   : <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-lg font-bold mb-4">Últimas Movimentações</div>
                        <div className="overflow-x-auto"></div>
                        {loading ? <div>Carregando...</div> 
                                 : <FinancialRecordTable records={data?.content || []} navigate={navigate} />}
                    </div>}
        </div>
    );
}

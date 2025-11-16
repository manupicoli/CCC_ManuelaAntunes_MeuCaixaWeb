export interface Dashboard {
    currentAmount: number;
    totalIncome: number;
    totalExpense: number;
    nextIncomeQuantity: number;
    categorySummary: {
        category: string;
        total: number;
    }[];
    monthlySummary: {
        month: string;
        totalIncome: number;
        totalExpense: number;
    }[];
}
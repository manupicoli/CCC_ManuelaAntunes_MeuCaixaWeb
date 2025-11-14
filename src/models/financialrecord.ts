export interface FinancialRecord {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  categoryTitle: string;
  categoryId: number;
  description: string;
  dueDate: string;
  paymentDate: string;
}

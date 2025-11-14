export interface FinancialRecord {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  categoryTitle: string;
  description: string;
  dueDate: string;
  paymentDate: string;
}

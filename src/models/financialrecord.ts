export type FinancialRecordType = "INCOME" | "EXPENSE";

export interface FinancialRecord {
  id: string;
  type: FinancialRecordType;
  amount: number;
  categoryTitle: string;
  categoryId: number;
  description: string;
  dueDate: string;
  paymentDate: string;
}

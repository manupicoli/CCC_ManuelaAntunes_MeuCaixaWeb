import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: {
    month: string;
    totalIncome: number;
    totalExpense: number;
  }[];
}

export default function MonthlyBarChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="totalIncome" name="Entradas" fill="#4CAF50" />
          <Bar dataKey="totalExpense" name="Saídas" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

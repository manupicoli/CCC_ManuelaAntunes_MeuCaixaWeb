interface SummaryCardInterface {
  title: string;
  value: string;
};

export default function SummaryCard(props: SummaryCardInterface) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">{props.title}</div>
            <div className="text-xl font-bold mt-2">{props.value}</div>
            <div className="h-2 bg-gray-100 rounded-full mt-3" />
        </div>
    );
}
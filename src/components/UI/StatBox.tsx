interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string; // Optional Tailwind color accent
}

export default function StatBox({ label, value, icon, accent = "teal" }: StatBoxProps) {
  return (
    <div className={`bg-gray-800 rounded-2xl p-4 shadow-md border border-${accent}-500 w-full`}>
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h4 className="text-sm text-gray-400">{label}</h4>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        {icon && <div className={`text-${accent}-400 text-3xl`}>{icon}</div>}
      </div>
    </div>
  );
}
// Placeholder for StatBox.tsx
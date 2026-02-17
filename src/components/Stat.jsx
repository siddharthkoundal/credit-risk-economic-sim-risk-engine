export default function Stat({
  label,
  value,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  color = "text-blue-400",
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Icon container */}
      <div className={`${color} p-3 rounded-lg bg-slate-800/50`}>
        <Icon size={24} />
      </div>

      {/* Label and Value */}
      <div className="flex flex-col">
        <p className="text-sm text-slate-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  );
}

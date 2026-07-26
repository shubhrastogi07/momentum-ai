function StatCard({ icon, value, title }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Icon */}
      <div className="mb-4 text-indigo-600 text-3xl">
        {icon}
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold text-slate-900">
        {value}
      </h2>

      {/* Title */}
      <p className="mt-1 text-slate-500">
        {title}
      </p>

    </div>
  );
}

export default StatCard;
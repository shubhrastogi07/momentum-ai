function ProgressCard({ title, completed, total }) {
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-4xl font-bold text-indigo-600">
          {progress}%
        </p>

        <p className="text-sm text-slate-500">
          {completed} / {total} Tasks
        </p>
      </div>

      <div className="mt-6 h-3 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressCard;
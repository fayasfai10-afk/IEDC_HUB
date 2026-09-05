import { Search } from "lucide-react";
import { categories } from "../data/categories";

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search startup ideas..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-indigo-400/50"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition ${category === item
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}

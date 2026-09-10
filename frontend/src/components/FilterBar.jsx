import { Search } from "lucide-react";
import { categories } from "../data/categories";

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="mb-10 flex flex-col gap-6">

      <div className="relative w-full max-w-xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search startup ideas..."
          aria-label="Search ideas"
          className="w-full border-b-2 border-line bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-teal-brand"
        />
      </div>

      <div className="flex gap-6 overflow-x-auto border-b border-line pb-0">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`relative whitespace-nowrap pb-3 text-sm font-semibold transition ${category === item
              ? "text-teal-brand after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-teal-brand"
              : "text-muted hover:text-navy"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
}

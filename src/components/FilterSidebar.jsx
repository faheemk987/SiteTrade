import { categories, technologies } from "@/data/websites";

export default function FilterSidebar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  const selectClass =
    "w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold";

  return (
    <div className="bg-white border border-line rounded-xl p-5 space-y-5">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Category</label>
        <select className={selectClass} value={filters.category} onChange={(e) => update("category", e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Technology</label>
        <select
          className={selectClass}
          value={filters.technology}
          onChange={(e) => update("technology", e.target.value)}
        >
          {technologies.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Minimum Price</label>
        <input
          type="number"
          min="0"
          placeholder="$0"
          className={selectClass}
          value={filters.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">Maximum Price</label>
        <input
          type="number"
          min="0"
          placeholder="Any"
          className={selectClass}
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
        />
      </div>
    </div>
  );
}

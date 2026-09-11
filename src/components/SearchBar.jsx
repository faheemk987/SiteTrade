import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-soft" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-md border border-line bg-white pl-10 pr-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-soft/70 focus:outline-none focus:border-gold"
      />
    </div>
  );
}

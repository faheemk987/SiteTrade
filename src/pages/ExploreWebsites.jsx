import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import WebsiteCard from "@/components/WebsiteCard";
import EmptyState from "@/components/EmptyState";
import { websites } from "@/data/websites";

const defaultFilters = {
  category: "All Categories",
  technology: "All Technologies",
  minPrice: "",
  maxPrice: "",
};

export default function ExploreWebsites() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);

  const results = useMemo(() => {
    return websites.filter((site) => {
      const query = search.trim().toLowerCase();
      if (query) {
        const matchesName = site.name.toLowerCase().includes(query);
        const matchesDescription = site.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDescription) return false;
      }
      if (filters.category !== "All Categories" && site.category !== filters.category) return false;
      if (filters.technology !== "All Technologies" && !site.technology.includes(filters.technology)) return false;
      if (filters.minPrice && site.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && site.price > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [search, filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal">Explore Websites</h1>
      <p className="text-charcoal-soft mt-2">Find websites that match your interests, budget and technology preferences.</p>

      <div className="mt-8">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by website name or keyword..." />
      </div>

      <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <div>
          <p className="text-sm text-charcoal-soft mb-4">{results.length} websites found</p>

          {results.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((site) => (
                <WebsiteCard key={site.id} {...site} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No websites found matching your search."
              description="Try adjusting your search term or filters."
            />
          )}
        </div>
      </div>
    </div>
  );
}

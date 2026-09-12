import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import WebsiteCard from "@/components/WebsiteCard";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import { technologies } from "@/data/websites";

const categoryPills = [
  { label: "All Categories", value: "All Categories" },
  { label: "SaaS", value: "SaaS" },
  { label: "Ecommerce", value: "Ecommerce" },
  { label: "Blog & Content", value: "Blog" },
  { label: "Education", value: "Education" },
  { label: "Portfolio", value: "Portfolio" },
  { label: "Business Services", value: "Business" },
  { label: "Other Assets", value: "Other" },
];

const marketStats = [
  { label: "ACTIVE DEALS", value: "148" },
  { label: "AVG. MULTIPLE", value: "2.8x ARR" },
  { label: "DIRECT ESCROW", value: "100%" },
];

const sortOptions = [
  { label: "Newest Listings", value: "newest" },
  { label: "Lowest Price", value: "price-asc" },
  { label: "Highest Price", value: "price-desc" },
];

const priceTierMap = {
  all: { min: 0, max: Number.MAX_SAFE_INTEGER },
  under5000: { min: 0, max: 4999 },
  range5000to20000: { min: 5000, max: 20000 },
  over20000: { min: 20000, max: Number.MAX_SAFE_INTEGER },
};

const normalizeWebsite = (site) => ({
  ...site,
  id: site._id || site.id,
  image: site.image || site.screenshots?.[0] || "",
  price: Number(site.price) || 0,
  technology: Array.isArray(site.technology) ? site.technology : site.technology ? [site.technology] : [],
  category: site.category || "Other",
  description: site.description || "",
  createdAt: site.createdAt || new Date().toISOString(),
});

export default function ExploreWebsites() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [priceTier, setPriceTier] = useState("all");
  const [techFilter, setTechFilter] = useState("All Technologies");
  const [sortBy, setSortBy] = useState("newest");
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchWebsites = async () => {
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (activeCategory !== "All Categories") params.set("category", activeCategory);
        if (techFilter !== "All Technologies") params.set("technology", techFilter);
        if (priceTier !== "all") {
          const { min, max } = priceTierMap[priceTier];
          params.set("minPrice", String(min));
          params.set("maxPrice", String(max));
        }

        const data = await api.get(`/websites${params.toString() ? `?${params.toString()}` : ""}`);
        if (!ignore) {
          setSites((Array.isArray(data) ? data : []).map(normalizeWebsite));
        }
      } catch (error) {
        if (!ignore) setSites([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchWebsites();
    return () => {
      ignore = true;
    };
  }, [search, activeCategory, priceTier, techFilter, sortBy]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = sites.filter((site) => {
      const matchesSearch =
        !query ||
        site.name.toLowerCase().includes(query) ||
        (site.description || "").toLowerCase().includes(query) ||
        site.category.toLowerCase().includes(query) ||
        (site.technology || []).some((item) => item.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      const matchesCategory =
        activeCategory === "All Categories" ||
        ((activeCategory === "Blog & Content" && site.category === "Blog") ||
          (activeCategory === "Business Services" && site.category === "Business") ||
          (activeCategory === "Other Assets" && site.category === "Other") ||
          site.category === activeCategory);

      if (!matchesCategory) return false;

      if (techFilter !== "All Technologies" && !(site.technology || []).includes(techFilter)) return false;

      const { min, max } = priceTierMap[priceTier];
      if (site.price < min || site.price > max) return false;

      return true;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return sorted;
  }, [sites, search, activeCategory, priceTier, techFilter, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All Categories");
    setPriceTier("all");
    setTechFilter("All Technologies");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#E6E0D2] bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8B06A]/40 bg-[#F3E0B6]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A87F2E]">
                <Sparkles size={12} className="text-[#A87F2E]" />
                INSTITUTIONAL DIGITAL SECONDARY MARKET
              </div>

              <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">Explore Websites</h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-charcoal-soft sm:text-lg">
                Discover vetted, revenue-producing software properties, niche publishing portfolios,
                and turnkey commerce platforms available for direct transaction.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {marketStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#E6E0D2] bg-[#F9F7F2] px-4 py-3 shadow-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-2xl text-charcoal">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E6E0D2] bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-soft" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search websites by name, niche, revenue model, or tech stack (e.g. Next.js, Shopify)..."
                className="w-full rounded-xl border border-[#E6E0D2] bg-[#F9F7F2] py-3 pl-11 pr-14 text-sm text-charcoal placeholder:text-charcoal-soft/70 focus:border-[#A87F2E] focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#E6E0D2] bg-white px-2 py-1 text-[10px] font-medium text-charcoal-soft">
                ⌘K
              </span>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6E0D2] bg-[#F9F7F2] px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:border-[#A87F2E] hover:text-[#A87F2E]"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categoryPills.map((pill) => {
              const isActive = activeCategory === pill.value;

              return (
                <button
                  key={pill.value}
                  type="button"
                  onClick={() => setActiveCategory(pill.value)}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "border-charcoal bg-charcoal text-cream"
                      : "border-[#E6E0D2] bg-[#F9F7F2] text-charcoal-soft hover:border-[#A87F2E] hover:text-charcoal",
                  ].join(" ")}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#E6E0D2] pt-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative">
                <select
                  value={priceTier}
                  onChange={(e) => setPriceTier(e.target.value)}
                  className="appearance-none rounded-xl border border-[#E6E0D2] bg-[#F9F7F2] px-3 py-2.5 pr-9 text-sm text-charcoal focus:border-[#A87F2E] focus:outline-none"
                >
                  <option value="all">Price: All Tiers</option>
                  <option value="under5000">Price: Under $5,000</option>
                  <option value="range5000to20000">Price: $5,000 - $20,000</option>
                  <option value="over20000">Price: $20,000+</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-soft" />
              </div>

              <div className="relative">
                <select
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                  className="appearance-none rounded-xl border border-[#E6E0D2] bg-[#F9F7F2] px-3 py-2.5 pr-9 text-sm text-charcoal focus:border-[#A87F2E] focus:outline-none"
                >
                  {technologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech === "All Technologies" ? "Tech: All Stacks" : `Tech: ${tech}`}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-soft" />
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-soft transition-colors hover:text-charcoal"
              >
                <SlidersHorizontal size={14} />
                Reset Filters
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <p className="text-sm text-charcoal-soft">
                Showing <span className="font-medium text-charcoal">{results.length}</span> available websites
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-[#E6E0D2] bg-white px-3 py-2.5 pr-9 text-sm text-charcoal focus:border-[#A87F2E] focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-soft" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10">
          {loading ? (
            <div className="rounded-xl border border-[#E6E0D2] bg-white p-8 text-center text-sm text-charcoal-soft">
              Loading websites...
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((site) => (
                <WebsiteCard key={site.id} {...site} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No websites found matching your search."
              description="Try adjusting your search terms, category pills, or filter selections."
            />
          )}
        </div>
      </div>
    </div>
  );
}

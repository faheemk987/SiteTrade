import { Link } from "react-router-dom";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

const formatCurrency = (amount) => `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;

const getMockMetrics = (price) => {
  const ttmRevenue = Math.round(price * 14.84);
  const netProfit = Math.round(price * 11.72);
  const multiple = (price / 1800).toFixed(1);

  return [
    { label: "TTM REV", value: formatCurrency(ttmRevenue) },
    { label: "NET PROFIT", value: formatCurrency(netProfit) },
    { label: "MULTIPLE", value: `${multiple}x` },
  ];
};

export default function WebsiteCard({
  id,
  name,
  image,
  category,
  description,
  technology,
  price,
  hosting,
  age,
}) {
  const domain = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.io`;
  const statusText = category === "SaaS" ? "Verified Listing" : "Active";
  const statusClasses =
    category === "SaaS"
      ? "border-[#D8B06A]/50 bg-[#F3E0B6]/40 text-[#A87F2E]"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const metrics = getMockMetrics(price);

  return (
    <Link
      to={`/website/${id}`}
      className="group block overflow-hidden rounded-[1.5rem] border border-[#E6E0D2] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A87F2E]/60 hover:shadow-md"
    >
      <div className="border-b border-[#E6E0D2] bg-[#F9F7F2] p-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F6B0A6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F5D387]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#A9D7B3]" />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-[#E6E0D2] bg-white px-2.5 py-1.5">
          <div className="flex items-center gap-2 text-[11px] text-charcoal-soft">
            <Lock size={12} className="text-charcoal-soft" />
            {domain}
          </div>
          <span className="rounded-full border border-[#E6E0D2] bg-[#F9F7F2] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-charcoal-soft">
            secure
          </span>
        </div>
      </div>

      <div className="h-44 w-full overflow-hidden bg-[#F0E9DF]">
        <img src={image} alt={`${name} screenshot`} className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#E6E0D2] bg-[#F9F7F2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft">
            {category}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${statusClasses}`}
          >
            <ShieldCheck size={11} />
            {statusText}
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-2xl leading-tight text-charcoal">{name}</h3>
          <div className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-charcoal-soft">
            <span>{hosting}</span>
            <span className="h-1 w-1 rounded-full bg-charcoal-soft" />
            <span>{age}</span>
          </div>
        </div>

        {description && (
          <p className="mt-3 text-sm leading-6 text-charcoal-soft">{description}</p>
        )}

        <div className="mt-4 rounded-xl border border-[#E6E0D2] bg-[#F9F7F2] p-3">
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-[#E6E0D2] bg-white p-2 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-charcoal-soft">
                  {metric.label}
                </p>
                <p className="mt-1 font-display text-lg text-charcoal">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {technology && technology.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technology.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#E6E0D2] bg-[#F9F7F2] px-2 py-1 text-[11px] text-charcoal-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#E6E0D2] pt-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-charcoal-soft">
              Asking Price
            </p>
            <p className="mt-1 font-display text-3xl leading-none text-charcoal">{formatCurrency(price)}</p>
          </div>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal transition-colors group-hover:text-[#A87F2E]">
            View Details
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

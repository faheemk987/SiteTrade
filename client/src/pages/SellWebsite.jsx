import { ShieldCheck } from "lucide-react";
import WebsiteForm from "@/components/WebsiteForm";

const stats = [
  { label: "AVG LISTING VISIBILITY", value: "3.8k Views / 7d" },
  { label: "COMMISSION", value: "0% Direct" },
];

export default function SellWebsite() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-stone-200/60 bg-stone-100/70 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-amber-100/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
              DIRECT OWNERSHIP TRANSFER
            </span>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Sell Your Website</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              List your digital business or website on SiteTrade. Reach thousands of active acquisition investors and operators directly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-stone-200/50 bg-white px-4 py-3 text-center shadow-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-6 flex flex-col gap-3 rounded-xl border border-amber-200/60 bg-amber-50/70 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-amber-200/70 p-2 text-amber-900">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Verified Listing Best Practice</p>
            <p className="text-sm text-gray-600">
              Provide accurate website information, verified telemetry, and clean responsive screenshots to help buyers understand your business and submit serious inquiries.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full border border-amber-200 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
          Standard SLA: ~2 hr review
        </span>
      </div>

      <WebsiteForm submitLabel="List My Website" />
    </div>
  );
}

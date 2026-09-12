import { useState } from "react";
import { ArrowRight, Check, LockKeyhole, ShieldCheck, UploadCloud } from "lucide-react";

const stats = [
  { label: "AVG LISTING VISIBILITY", value: "3.8k Views / 7d" },
  { label: "COMMISSION", value: "0% Direct" },
];

const fieldBaseClass =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none";

export default function SellWebsite() {
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteUrl: "",
    websiteAge: "",
    category: "",
    overview: "",
    frontend: "React, Next.js, Tailwind CSS",
    backend: "Node.js, Express, Python, FastAPI",
    database: "PostgreSQL, MongoDB, Supabase",
    hosting: "Vercel, AWS, Cloudflare",
    price: "$ 7,500",
    sellerEmail: "seller@domain.com",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const overviewLength = formData.overview.length;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sell website submitted", { ...formData, uploadedFiles: uploadedFiles.map((file) => file.name) });
  };

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

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <section className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
                    PART 01
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900">General Asset Profile</h2>
                </div>

                <span className="rounded-full border border-stone-300 bg-stone-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
                  Public Spec
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Website Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.websiteName}
                    onChange={(event) => handleFieldChange("websiteName", event.target.value)}
                    placeholder="e.g. MySaaS Platform"
                    className={fieldBaseClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Website URL<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(event) => handleFieldChange("websiteUrl", event.target.value)}
                      placeholder="https://mywebsite.com"
                      className={fieldBaseClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Website Age<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.websiteAge}
                      onChange={(event) => handleFieldChange("websiteAge", event.target.value)}
                      placeholder="e.g. 2 years 4 months"
                      className={fieldBaseClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category Classification<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(event) => handleFieldChange("category", event.target.value)}
                      className={`${fieldBaseClass} appearance-none pr-10`}
                    >
                      <option value="">Select Primary Industry / Type</option>
                      <option value="SaaS">SaaS</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Content">Content</option>
                      <option value="Marketplace">Marketplace</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Business Overview & Synopsis<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.overview}
                    onChange={(event) => handleFieldChange("overview", event.target.value)}
                    maxLength={2000}
                    rows={6}
                    className={`${fieldBaseClass} resize-none`}
                    placeholder="Tell buyers about your product, growth, monetization, and customer value..."
                  />
                  <div className="flex justify-end text-[11px] font-medium text-gray-500">
                    {overviewLength} / 2,000 characters
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Screenshots & Telemetry
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50/80 px-4 py-8 text-center transition-colors hover:border-gray-400">
                    <div className="rounded-full bg-white p-3 text-gray-700 shadow-sm">
                      <UploadCloud className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700">Drop website screenshots here or browse files</p>
                      <p className="mt-1 text-xs text-gray-500">PNG / JPEG / WEBP up to 5 images (10MB each)</p>
                    </div>

                    <input type="file" multiple accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
                  </label>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-gray-700"
                        >
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="rounded-2xl border border-stone-200/60 bg-stone-50 p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-amber-100 p-2 text-amber-800">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Direct Seller Protection</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We never broadcast your raw nameserver keys, database credentials, or customer PII. Inquiries arrive securely to your specified inbox for structured direct negotiation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
                  PART 02
                </span>
                <h2 className="text-xl font-semibold text-gray-900">Technology Architecture</h2>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  { key: "frontend", label: "Frontend Stack", pill: "Client layer" },
                  { key: "backend", label: "Backend Technology", pill: "Server engine" },
                  { key: "database", label: "Database / Storage", pill: "Data layer" },
                  { key: "hosting", label: "Hosting & Infrastructure", pill: "Cloud provider" },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                      <span className="rounded-full border border-stone-200 bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
                        {field.pill}
                      </span>
                    </div>

                    <input
                      type="text"
                      value={formData[field.key]}
                      onChange={(event) => handleFieldChange(field.key, event.target.value)}
                      className={fieldBaseClass}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
                  PART 03
                </span>
                <h2 className="text-xl font-semibold text-gray-900">Terms & Seller Contact</h2>
              </div>

              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Asking Price ($ USD)<span className="text-red-500">*</span>
                    </label>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
                      FIXED OR NEGOTIABLE
                    </span>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(event) => handleFieldChange("price", event.target.value)}
                      className={`${fieldBaseClass} pl-8`}
                    />
                  </div>

                  <p className="text-xs text-gray-500">
                    Typical SaaS properties trade between 2.5x to 4.5x annual net profit.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Seller Direct Email<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.sellerEmail}
                      onChange={(event) => handleFieldChange("sellerEmail", event.target.value)}
                      className={`${fieldBaseClass} pr-10`}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <LockKeyhole className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        TARGET PLATFORM FEE
                      </p>
                      <p className="mt-1 text-xl font-semibold text-gray-900">$0.00 (Free Public Listing)</p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="rounded-2xl border border-amber-200/50 bg-amber-100/50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">LISTING REACH</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">Over 42,000 Verified Subscribers</h3>
              <p className="mt-2 text-sm text-gray-600">
                Every curated asset receives direct placement in the weekly Sunday Morning Acquisition digest distributed to private angels and bootstrap micro-funds.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="rounded-full bg-stone-100 p-2 text-gray-700">
              <LockKeyhole className="h-4 w-4" />
            </div>
            <p>Direct Email Negotiations: No commissions or hidden escrow fees...</p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-stone-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              List My Website
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

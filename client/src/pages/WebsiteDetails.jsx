import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Bookmark,
  Check,
  ChevronRight,
  Flag,
  ShieldCheck,
  Share2,
  TrendingUp,
} from "lucide-react";
import { api } from "@/lib/api";
import { isRequired, isValidEmail } from "@/utils/validate";

const actionButtons = [
  { label: "Save", icon: Bookmark },
  { label: "Report", icon: Flag },
  { label: "Share", icon: Share2 },
];

export default function WebsiteDetails() {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWebsite = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.get(`/websites/${id}`);
      const normalized = {
        ...data,
        id: data._id || data.id,
        image: data.image || data.screenshots?.[0] || "",
        screenshots: data.screenshots || [],
        technology: Array.isArray(data.technology) ? data.technology : data.technology ? [data.technology] : [],
        included: data.included || [],
        sellerName: data.seller?.name || data.sellerName || "Seller",
        sellerVerified: data.sellerVerified ?? true,
        category: data.category || "Other",
        description: data.description || "",
        fullDescription: data.fullDescription || data.description || "",
      };
      setSite(normalized);
    } catch (err) {
      setSite(null);
      setError(err.friendlyMessage || err.message || "Unable to load website details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsite();
  }, [id]);

  const [activeImage, setActiveImage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setActiveImage(site?.screenshots?.[0] ?? "");
    setSent(false);
    setForm({ name: "", email: "", message: "", termsAccepted: false });
    setErrors({});
  }, [site]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">Loading website...</h1>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">{error ? "Website not found" : "Website not found"}</h1>
        <p className="mt-4 text-sm text-charcoal-soft">{error || "The listing you requested could not be found."}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={fetchWebsite}
            className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-charcoal"
          >
            Try again
          </button>
          <Link to="/explore" className="inline-block rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-cream">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const contactSeller = () => {
    document.getElementById("contact-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!isRequired(form.name)) nextErrors.name = "Your full name is required.";
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!isRequired(form.message)) nextErrors.message = "Please write a short inquiry.";
    if (!form.termsAccepted) {
      nextErrors.termsAccepted = "Please accept the buyer inquiry terms.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSent(true);
    setErrors({});
    setForm({ name: "", email: "", message: "", termsAccepted: false });
  };

  const stats = [
    { label: "Monthly Revenue", value: formatCurrency(site.monthlyRevenue ?? 0) },
    { label: "Website Age", value: site.age },
    { label: "Health Score", value: `${site.healthScore ?? 0}%` },
  ];

  const technicalDetails = [
    ["Category", site.category],
    ["Platform/CMS", site.platform],
    ["Tech Stack", site.technology.join(", ")],
    ["Monetization Method", site.monetization],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-line pb-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-charcoal-soft">
          <Link to="/explore" className="font-medium text-charcoal hover:text-gold">
            Explore Websites
          </Link>
          <ChevronRight className="h-4 w-4 text-charcoal-soft" />
          <span>{site.category}</span>
          <ChevronRight className="h-4 w-4 text-charcoal-soft" />
          <span className="font-medium text-charcoal">{site.name}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          {actionButtons.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_10px_30px_rgba(38,35,32,0.04)]">
            <div className="flex items-center gap-2 rounded-t-xl border-b border-line bg-[#F2EEE6] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D0C4B0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#D0C4B0]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#D0C4B0]" />
            </div>
            <div className="overflow-hidden rounded-b-xl">
              <img src={activeImage} alt={site.name} className="h-[380px] w-full object-cover sm:h-[460px]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              {site.screenshots.map((shot, index) => (
                <button
                  key={`${shot}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(shot)}
                  className={`h-16 w-24 overflow-hidden rounded-lg border transition-all ${
                    activeImage === shot ? "border-gold shadow-sm" : "border-line"
                  }`}
                  aria-label={`View screenshot ${index + 1}`}
                >
                  <img src={shot} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-charcoal">
                <TrendingUp className="h-3.5 w-3.5 text-[#2F5D4F]" />
                {site.visitors}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-[#F1E6CC] px-2.5 py-1 text-xs font-medium text-[#A87F2E]">
                <Check className="h-3.5 w-3.5" />
                {site.healthScore}% Health
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-line bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-2xl text-charcoal">About This Website</h2>
              <span className="inline-flex items-center rounded-full border border-[#D9C9A1] bg-[#F1E6CC] px-2.5 py-1 text-xs font-medium text-[#A87F2E]">
                Content Quality: Excellent
              </span>
            </div>
            <p className="mt-4 text-base leading-7 text-charcoal-soft">{site.fullDescription}</p>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl text-charcoal">What&apos;s Included in Sale</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {site.included.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-[#F7F4EC] p-3.5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E7F0EC] text-[#2F5D4F]">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl text-charcoal">Website Technical Information</h2>
            <dl className="mt-5 divide-y divide-line">
              {technicalDetails.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-charcoal-soft">{label}</dt>
                  <dd className="text-right text-sm font-medium text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_10px_30px_rgba(38,35,32,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl leading-tight text-[#2F5D4F]">{site.name}</h1>
                <p className="mt-2 text-sm text-charcoal-soft">{site.category} • {site.type}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-[#F7F4EC] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal-soft">
                  Asking Price
                </span>
                <span className="inline-flex items-center rounded-full border border-[#D9C9A1] bg-[#F1E6CC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A87F2E]">
                  Fair Market Value
                </span>
              </div>
              <p className="mt-3 text-4xl font-semibold text-charcoal">{formatCurrency(site.price)}</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-line bg-[#F7F4EC] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-charcoal-soft">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-charcoal">{value}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={contactSeller}
              className="mt-5 w-full rounded-xl bg-charcoal px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2F5D4F]"
            >
              Contact Seller
            </button>
            <p className="mt-2 text-center text-xs text-charcoal-soft">1 active conversation</p>

            <div className="mt-6 rounded-2xl border border-line bg-[#F7F4EC] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F5D4F] text-sm font-semibold text-white">
                  {site.sellerName
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-charcoal">{site.sellerName}</p>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#2F5D4F]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {site.sellerVerified ? "Verified Seller" : "Seller Profile"}
                  </div>
                </div>
              </div>
            </div>

            <div id="contact-panel" className="mt-6 rounded-2xl border border-line bg-white p-5">
              <h3 className="font-display text-2xl text-charcoal">Contact Seller</h3>
              <p className="mt-1 text-sm text-charcoal-soft">Send a message to the seller</p>

              {sent ? (
                <div className="mt-5 rounded-xl border border-[#CFE0D7] bg-[#EAF3EE] p-4 text-sm text-[#2F5D4F]">
                  <p className="font-semibold">Message sent successfully.</p>
                  <p className="mt-1">The seller will reach out to you at the email address you provided.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal">Your Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-md border border-line bg-[#F7F4EC] px-3.5 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal">Your Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-md border border-line bg-[#F7F4EC] px-3.5 py-2.5 text-sm text-charcoal focus:border-gold focus:outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal">Inquiry Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share a few details about what you're looking for, your timeline, and any questions you have about the business."
                      className="w-full rounded-md border border-line bg-[#F7F4EC] px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal-soft focus:border-gold focus:outline-none"
                    />
                    {errors.message && <p className="mt-1 text-xs text-red">{errors.message}</p>}
                  </div>

                  <label className="flex items-start gap-2 rounded-md border border-line bg-[#F7F4EC] p-3 text-sm text-charcoal-soft">
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-line text-[#2F5D4F] focus:ring-[#2F5D4F]"
                    />
                    <span>I agree to SiteTrade&apos;s terms for buyer inquiries.</span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-xs text-red">{errors.termsAccepted}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-charcoal px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2F5D4F]"
                  >
                    Send Direct Message
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs font-medium text-charcoal-soft">
                    <ShieldCheck className="h-4 w-4 text-[#2F5D4F]" />
                    Safe Direct Deal Flow
                  </div>
                </form>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

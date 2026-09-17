import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe2,
  Search,
  Handshake,
  TrendingUp,
  Users,
  Mail,
  Sparkles,
  Plus,
} from "lucide-react";
import WebsiteCard from "@/components/WebsiteCard";
import { api } from "@/lib/api";

const normalizeWebsite = (site) => ({
  ...site,
  id: site._id || site.id,
  image: site.image || site.screenshots?.[0] || "",
  price: Number(site.price) || 0,
  technology: Array.isArray(site.technology) ? site.technology : site.technology ? [site.technology] : [],
  category: site.category || "Other",
  description: site.description || "",
});

const listingCards = [
  {
    name: "PressFlow News",
    price: "$4,800",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
    badge: "Verified Traffic",
    category: "Blog & Media",
    description: "Curated editorial platform covering generative AI with 24k active monthly subscribers.",
    tags: ["Next.js", "Ghost CMS", "Stripe"],
    primary: false,
  },
  {
    name: "OptiScale Cloud",
    price: "$32,000",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    badge: "Prime Listing",
    premiumLine: "Multiple: 3.8x TTM",
    stats: [
      { label: "MRR", value: "$1,420" },
      { label: "Net Margin", value: "84%" },
      { label: "Subscribers", value: "390" },
    ],
    primary: true,
  },
  {
    name: "Loom & Grain",
    price: "$18,500",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    category: "Ecommerce",
    description:
      "Sustainable homewares brand with direct-to-consumer relationships and a 41% repeat rate.",
    tags: ["Shopify", "Klaviyo", "Meta Ads"],
    primary: false,
  },
];

const stats = [
  { value: "500+", label: "Websites Listed", icon: Globe2 },
  { value: "300+", label: "Active Sellers", icon: Users },
  { value: "$2M+", label: "Total Listing Volume", icon: TrendingUp },
  { value: "100%", label: "Direct Email Inquiries", icon: Mail },
];

const steps = [
  {
    number: "01",
    title: "List Your Website",
    description: "Add your website details, screenshots and asking price.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Get Discovered",
    description: "Buyers browse websites using search and filters.",
    icon: Search,
  },
  {
    number: "03",
    title: "Connect",
    description: "Interested buyers contact sellers through email.",
    icon: Handshake,
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchFeatured = async () => {
      try {
        const data = await api.get("/websites");
        if (!ignore) {
          setFeatured((Array.isArray(data) ? data : []).map(normalizeWebsite).slice(0, 6));
        }
      } catch {
        if (!ignore) setFeatured([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchFeatured();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
            <Sparkles size={12} className="text-gold" />
            Marketplace for Established Web Assets
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-charcoal sm:text-6xl md:text-7xl">
            Buy & Sell Websites Easily
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-charcoal-soft">
            Discover profitable websites or list your own website for potential buyers. Direct,
            transparent trading with zero hidden intermediary fees.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex h-[3.6rem] w-[16rem] items-center justify-center gap-2 rounded-xl bg-charcoal px-6 text-[15px] font-medium text-cream shadow-sm transition-all duration-200 hover:bg-gold"
            >
              Explore Websites
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/sell"
              state={{ from: { pathname: "/sell" } }}
              className="inline-flex h-[3.6rem] w-[16rem] items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 text-[15px] font-medium text-charcoal shadow-sm transition-all duration-200 hover:border-gold"
            >
              <Plus size={16} />
              Sell Your Website
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {listingCards.map((card, index) => {
            const isMiddle = index === 1;

            return (
              <article
                key={card.name}
                className={[
                  "relative rounded-[1.5rem] border border-line bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md",
                  isMiddle ? "md:-translate-y-4 md:shadow-[0_18px_38px_rgba(38,35,32,0.10)]" : "md:mt-4",
                ].join(" ")}
              >
                {card.primary ? (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-gold">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gold/50 bg-white text-[8px] text-gold">
                          ✓
                        </span>
                        {card.badge}
                      </span>

                      <span className="font-display text-4xl leading-none text-charcoal">{card.price}</span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-charcoal-soft">{card.premiumLine}</p>

                    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-cream/60">
                      <img src={card.image} alt={card.name} className="h-44 w-full object-cover" />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
                      {card.stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-line bg-cream/60 p-2 text-center">
                          <p className="font-display text-lg text-charcoal">{stat.value}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-charcoal-soft">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-display text-2xl text-charcoal">{card.name}</p>
                      <Link
                        to="/explore"
                        className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-gold"
                      >
                        Explore
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative overflow-hidden rounded-xl border border-line bg-cream/60">
                      <img src={card.image} alt={card.name} className="h-44 w-full object-cover" />
                      {card.badge && (
                        <span className="absolute left-3 top-3 inline-flex rounded-full border border-line bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-charcoal-soft">
                          {card.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 rounded-md bg-charcoal/90 px-2.5 py-1 font-display text-xl text-cream">
                        {card.price}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="font-display text-2xl text-charcoal">{card.name}</p>
                      {card.category && (
                        <span className="rounded-full border border-line bg-cream px-2 py-1 text-[11px] text-charcoal-soft">
                          {card.category}
                        </span>
                      )}
                    </div>

                    {card.description && (
                      <p className="mt-3 text-sm leading-6 text-charcoal-soft">{card.description}</p>
                    )}

                    {card.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line bg-cream px-2 py-1 text-[11px] text-charcoal-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={16} />
              </div>
              <p className="mt-4 font-display text-3xl text-charcoal">{value}</p>
              <p className="mt-1 text-sm text-charcoal-soft">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Websites */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl text-charcoal">Featured Websites</h2>
          <p className="text-charcoal-soft mt-2">Explore selected websites available on SiteTrade.</p>
        </div>

        {loading ? (
          <div className="mt-8 rounded-xl border border-line bg-white p-8 text-center text-sm text-charcoal-soft">
            Loading featured websites...
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((site) => (
              <WebsiteCard key={site.id} {...site} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 border border-line bg-white text-charcoal px-6 py-3 rounded-md text-[15px] font-medium hover:border-gold transition-colors"
          >
            View All Websites
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How It Works preview */}
      <section className="bg-cream-deep/60 border-y border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-charcoal max-w-lg">How SiteTrade works</h2>

          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number}>
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-gold" />
                    <span className="text-sm text-charcoal-soft">{step.number}</span>
                  </div>
                  <h3 className="font-display text-xl text-charcoal mt-3">{step.title}</h3>
                  <p className="text-charcoal-soft mt-2">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl text-charcoal">Ready to trade your website?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/sell"
            state={{ from: { pathname: "/sell" } }}
            className="bg-charcoal text-cream px-6 py-3 rounded-md text-[15px] font-medium hover:bg-gold transition-colors"
          >
            Sell Your Website
          </Link>
          <Link
            to="/explore"
            className="border border-line bg-white text-charcoal px-6 py-3 rounded-md text-[15px] font-medium hover:border-gold transition-colors"
          >
            Explore Websites
          </Link>
        </div>
      </section>
    </div>
  );
}

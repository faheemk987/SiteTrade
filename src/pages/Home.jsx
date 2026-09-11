import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Search, Handshake } from "lucide-react";
import WebsiteCard from "@/components/WebsiteCard";
import { websites } from "@/data/websites";

const stats = [
  { value: "500+", label: "Websites" },
  { value: "300+", label: "Sellers" },
  { value: "$2M+", label: "Listings" },
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
  const featured = websites.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-medium tracking-wide text-gold bg-gold-soft px-3 py-1 rounded-full">
              THE WEBSITE MARKETPLACE
            </span>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] text-charcoal mt-5">
              Buy & sell websites easily.
            </h1>
            <p className="mt-6 text-lg text-charcoal-soft max-w-md">
              Discover websites ready for their next owner or list your own website for potential buyers.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/explore"
                className="bg-charcoal text-cream px-6 py-3 rounded-md text-[15px] font-medium hover:bg-gold transition-colors"
              >
                Explore Websites
              </Link>
              <Link
                to="/sell"
                className="border border-line bg-white text-charcoal px-6 py-3 rounded-md text-[15px] font-medium hover:border-gold transition-colors"
              >
                Sell Your Website
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 max-w-md border-t border-line pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-charcoal">{stat.value}</p>
                  <p className="text-sm text-charcoal-soft mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Simple visual: stacked listing cards, not a complex illustration */}
          <div className="hidden lg:block relative h-[420px]">
            {featured.slice(0, 3).map((site, i) => (
              <div
                key={site.id}
                className="absolute w-72 bg-white border border-line rounded-xl p-5"
                style={{
                  top: `${i * 70}px`,
                  right: `${i * 30}px`,
                  zIndex: 3 - i,
                }}
              >
                <p className="font-display text-lg text-charcoal">{site.name}</p>
                <p className="text-sm text-charcoal-soft mt-0.5">{site.category}</p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-line">
                  <span className="text-sm text-charcoal-soft">Asking price</span>
                  <span className="font-display text-lg text-charcoal">${site.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Websites */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl text-charcoal">Featured Websites</h2>
          <p className="text-charcoal-soft mt-2">Explore selected websites available on SiteTrade.</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((site) => (
            <WebsiteCard key={site.id} {...site} />
          ))}
        </div>

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

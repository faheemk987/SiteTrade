import { Link } from "react-router-dom";
import { Globe2, Search, Mail } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "List Your Website",
    description: "Add your website name, URL, description, screenshots and asking price.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Get Discovered",
    description: "Your listing becomes available for buyers to explore and filter.",
    icon: Search,
  },
  {
    number: "03",
    title: "Contact the Seller",
    description: "Interested buyers can contact sellers directly through email.",
    icon: Mail,
  },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl text-charcoal">How SiteTrade Works</h1>
      <p className="text-charcoal-soft mt-3 max-w-xl">
        Buyers and sellers can connect through a simple and transparent website marketplace.
      </p>

      <div className="mt-14 grid sm:grid-cols-3 gap-10">
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

      <div className="mt-20 bg-cream-deep/60 border border-line rounded-xl p-10 text-center">
        <h2 className="font-display text-2xl text-charcoal">Have a website to sell?</h2>
        <Link
          to="/sell"
          state={{ from: { pathname: "/sell" } }}
          className="inline-block mt-6 bg-charcoal text-cream px-6 py-3 rounded-md text-[15px] font-medium hover:bg-gold transition-colors"
        >
          List Your Website
        </Link>
      </div>
    </div>
  );
}

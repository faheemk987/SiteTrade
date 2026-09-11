import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg text-charcoal">SiteTrade</p>
          <p className="text-sm text-charcoal-soft mt-1">A simple marketplace to buy and sell websites.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-charcoal-soft">
          <Link to="/explore" className="hover:text-charcoal transition-colors">Explore Websites</Link>
          <Link to="/sell" className="hover:text-charcoal transition-colors">Sell Website</Link>
          <Link to="/how-it-works" className="hover:text-charcoal transition-colors">How It Works</Link>
          <Link to="/login" className="hover:text-charcoal transition-colors">Login</Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-charcoal-soft/70">
        © 2026 SiteTrade. All rights reserved.
      </div>
    </footer>
  );
}

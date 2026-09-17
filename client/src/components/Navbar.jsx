import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowLeftRight, UserRound } from "lucide-react";
import { isAuthenticated } from "@/utils/auth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Websites" },
  { to: "/how-it-works", label: "How It Works" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSellWebsite = () => {
    setOpen(false);
    navigate(isAuthenticated() ? "/sell" : "/login?redirect=%2Fsell", isAuthenticated()
      ? undefined
      : { state: { from: { pathname: "/sell" } } });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-xl text-charcoal">
            <ArrowLeftRight size={18} className="text-gold" strokeWidth={2.25} />
            SiteTrade
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-[15px] transition-colors ${
                    isActive ? "text-charcoal font-medium" : "text-charcoal-soft hover:text-charcoal"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-[15px] text-charcoal-soft hover:text-charcoal transition-colors px-3 py-2">
              Login
            </Link>
            <button
              type="button"
              onClick={handleSellWebsite}
              className="text-[15px] bg-charcoal text-cream px-4 py-2 rounded-md hover:bg-gold transition-colors"
            >
              Sell Website
            </button>
            <button
              type="button"
              aria-label="User profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-gold hover:text-gold"
            >
              <UserRound size={18} />
            </button>
          </div>

          <button className="md:hidden text-charcoal" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-cream px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-charcoal-soft" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-line">
            <Link to="/login" className="text-charcoal-soft" onClick={() => setOpen(false)}>
              Login
            </Link>
            <button
              type="button"
              onClick={handleSellWebsite}
              className="bg-charcoal text-cream px-4 py-2 rounded-md text-center"
            >
              Sell Website
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

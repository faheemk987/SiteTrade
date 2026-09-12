import { Outlet, NavLink, Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";

const tabs = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/websites", label: "Websites" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="border-b border-line bg-cream/90 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-display text-xl text-charcoal">
              <ArrowLeftRight size={18} className="text-gold" />
              SiteTrade <span className="text-charcoal-soft text-sm font-sans">Admin</span>
            </Link>
          </div>
          <nav className="flex gap-6 -mb-px">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `pb-3 text-sm border-b-2 transition-colors ${
                    isActive ? "border-gold text-charcoal font-medium" : "border-transparent text-charcoal-soft hover:text-charcoal"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Globe, PlusCircle, User, LogOut, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/websites", label: "My Websites", icon: Globe },
  { to: "/sell", label: "Sell Website", icon: PlusCircle },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export default function DashboardSidebar({ onNavigate, showClose, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sitetrade_auth");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full">
      {showClose && (
        <div className="flex justify-end mb-2">
          <button onClick={onClose} aria-label="Close menu" className="text-charcoal-soft">
            <X size={20} />
          </button>
        </div>
      )}
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white border border-line text-charcoal font-medium"
                    : "text-charcoal-soft hover:text-charcoal"
                }`
              }
            >
              <Icon size={17} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-charcoal-soft hover:text-red transition-colors"
      >
        <LogOut size={17} />
        Logout
      </button>
    </div>
  );
}

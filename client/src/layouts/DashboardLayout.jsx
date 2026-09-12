import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, ArrowLeftRight } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* Top bar (mobile) */}
      <div className="md:hidden sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-line">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2 font-display text-lg text-charcoal">
            <ArrowLeftRight size={16} className="text-gold" />
            SiteTrade
          </Link>
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-charcoal">
            <Menu size={22} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="w-56 shrink-0 border-r border-line pr-6 hidden md:block">
            <div className="sticky top-10">
              <Link to="/" className="flex items-center gap-2 font-display text-xl text-charcoal mb-8">
                <ArrowLeftRight size={18} className="text-gold" />
                SiteTrade
              </Link>
              <DashboardSidebar />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          {mobileOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileOpen(false)} />
              <div className="relative w-64 bg-cream h-full p-5 border-r border-line">
                <DashboardSidebar
                  onNavigate={() => setMobileOpen(false)}
                  showClose
                  onClose={() => setMobileOpen(false)}
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

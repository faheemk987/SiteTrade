import { useEffect, useState } from "react";
import { Users2, Globe2, ListChecks } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalWebsites: 0, activeListings: 0 });

  useEffect(() => {
    let ignore = false;

    const fetchStats = async () => {
      try {
        const data = await api.get("/admin/stats");
        if (!ignore) setStats(data || { totalUsers: 0, totalWebsites: 0, activeListings: 0 });
      } catch {
        if (!ignore) setStats({ totalUsers: 0, totalWebsites: 0, activeListings: 0 });
      }
    };

    fetchStats();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Admin Dashboard</h1>
      <p className="text-charcoal-soft mt-1">Overview of platform activity.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatsCard label="Total Users" value={stats.totalUsers} icon={Users2} />
        <StatsCard label="Total Websites" value={stats.totalWebsites} icon={Globe2} />
        <StatsCard label="Active Listings" value={stats.activeListings} icon={ListChecks} />
      </div>
    </div>
  );
}

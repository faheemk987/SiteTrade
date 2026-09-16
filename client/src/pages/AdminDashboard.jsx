import { useEffect, useState } from "react";
import { Users2, Globe2, ListChecks } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalWebsites: 0, activeListings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get("/admin/stats");
        setStats(data || { totalUsers: 0, totalWebsites: 0, activeListings: 0 });
      } catch (err) {
        setError(err.friendlyMessage || err.message || "Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Admin Dashboard</h1>
      <p className="text-charcoal-soft mt-1">Overview of platform activity.</p>

      {error && <div className="mt-6 rounded-md border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">{error}</div>}

      {loading ? (
        <div className="mt-8 text-sm text-charcoal-soft">Loading admin dashboard...</div>
      ) : (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatsCard label="Total Users" value={stats.totalUsers} icon={Users2} />
          <StatsCard label="Total Websites" value={stats.totalWebsites} icon={Globe2} />
          <StatsCard label="Active Listings" value={stats.activeListings} icon={ListChecks} />
        </div>
      )}
    </div>
  );
}

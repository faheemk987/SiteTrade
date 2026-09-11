import { Users2, Globe2, ListChecks } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { websites } from "@/data/websites";
import { users } from "@/data/users";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Admin Dashboard</h1>
      <p className="text-charcoal-soft mt-1">Overview of platform activity.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatsCard label="Total Users" value={users.length} icon={Users2} />
        <StatsCard label="Total Websites" value={websites.length} icon={Globe2} />
        <StatsCard label="Active Listings" value={websites.length} icon={ListChecks} />
      </div>
    </div>
  );
}

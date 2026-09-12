import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe2, ListChecks, Eye } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { api } from "@/lib/api";

const normalizeWebsite = (site) => ({
  ...site,
  id: site._id || site.id,
  status: "Active",
  price: Number(site.price) || 0,
  category: site.category || "Other",
});

export default function Dashboard() {
  const [myWebsites, setMyWebsites] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchDashboardData = async () => {
      try {
        const data = await api.get("/users/my-websites");
        if (!ignore) setMyWebsites((Array.isArray(data) ? data : []).map(normalizeWebsite));
      } catch {
        if (!ignore) setMyWebsites([]);
      }
    };

    fetchDashboardData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Welcome Back!</h1>
      <p className="text-charcoal-soft mt-1">Manage your website listings from one place.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatsCard label="My Websites" value={myWebsites.length} icon={Globe2} />
        <StatsCard label="Active Listings" value={myWebsites.length} icon={ListChecks} />
        <StatsCard label="Total Views" value="1,248" icon={Eye} />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-charcoal">Recent Listings</h2>
          <Link to="/dashboard/websites" className="text-sm text-charcoal-soft hover:text-charcoal">
            View all →
          </Link>
        </div>

        <div className="bg-white border border-line rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-line text-left text-charcoal-soft">
                <th className="px-5 py-3 font-medium">Website Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myWebsites.map((site) => (
                <tr key={site.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 text-charcoal">{site.name}</td>
                  <td className="px-5 py-3 text-charcoal-soft">{site.category}</td>
                  <td className="px-5 py-3 text-charcoal">${Number(site.price || 0).toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs bg-gold-soft text-charcoal px-2 py-0.5 rounded-md">{site.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-3">
                      <Link to={`/website/${site.id}`} className="text-charcoal-soft hover:text-charcoal">View</Link>
                      <Link to={`/dashboard/websites/edit/${site.id}`} className="text-charcoal-soft hover:text-charcoal">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

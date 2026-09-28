import { useEffect, useState } from "react";
import { Users2, Globe2, ListChecks, ClipboardList, BadgeDollarSign } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalWebsites: 0, activeListings: 0, totalRequests: 0, completedSales: 0, totalCommission: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState("");
  const [userMessage, setUserMessage] = useState("");

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

  const fetchUsers = async () => {
    try {
      const data = await api.get("/admin/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.friendlyMessage || err.message || "Unable to load users.");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (user, status) => {
    try {
      const data = await api.put(`/admin/users/${user._id || user.id}/status`, { status });
      setUsers((current) => current.map((item) => (item._id || item.id) === (user._id || user.id) ? data : item));
      setUserMessage(`User ${status} successfully.`);
    } catch (err) {
      setError(err.friendlyMessage || err.message || "Unable to update user status.");
    }
  };

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
          <StatsCard label="Purchase Requests" value={stats.totalRequests} icon={ClipboardList} />
          <StatsCard label="Completed Sales" value={stats.completedSales} icon={BadgeDollarSign} />
          <StatsCard label="Commission Earnings" value={`$${Number(stats.totalCommission || 0).toLocaleString()}`} icon={BadgeDollarSign} />
        </div>
      )}

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-charcoal">User Management</h2>
            <p className="mt-1 text-sm text-charcoal-soft">Review new accounts before they access marketplace actions.</p>
          </div>
          {userMessage && <p className="text-sm text-[#2F5D4F]">{userMessage}</p>}
        </div>

        {usersLoading ? (
          <div className="mt-5 text-sm text-charcoal-soft">Loading users...</div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[720px] text-sm">
              <thead><tr className="border-b border-line text-left text-charcoal-soft">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Registered</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr></thead>
              <tbody>{users.map((user) => {
                const status = user.role === "admin" ? "approved" : user.status || "pending";
                return (
                  <tr key={user._id || user.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 text-charcoal">{user.name}</td>
                    <td className="px-5 py-3 text-charcoal-soft">{user.email}</td>
                    <td className="px-5 py-3 text-charcoal">{user.role}</td>
                    <td className="px-5 py-3"><span className="rounded-md bg-gold-soft px-2 py-1 text-xs text-charcoal">{status}</span></td>
                    <td className="px-5 py-3 text-charcoal-soft">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="px-5 py-3">
                      {user.role === "admin" ? <span className="text-xs text-charcoal-soft">Admin</span> : status === "pending" ? (
                        <div className="flex gap-3">
                          <button type="button" onClick={() => updateUserStatus(user, "approved")} className="text-[#2F5D4F] hover:underline">Approve</button>
                          <button type="button" onClick={() => updateUserStatus(user, "rejected")} className="text-red hover:underline">Reject</button>
                        </div>
                      ) : <span className="text-xs text-charcoal-soft">{status === "approved" ? "Approved" : "Rejected"}</span>}
                    </td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

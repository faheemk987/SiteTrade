import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/admin/requests").then((data) => setRequests(Array.isArray(data) ? data : [])).catch((err) => setError(err.friendlyMessage || err.message)); }, []);
  return <div><h1 className="font-display text-3xl text-charcoal">Purchase Requests</h1>{error && <p className="mt-4 text-sm text-red">{error}</p>}<div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white"><table className="w-full min-w-[850px] text-sm"><thead><tr className="border-b border-line text-left text-charcoal-soft"><th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Seller</th><th className="px-5 py-3">Website</th><th className="px-5 py-3">Price</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th></tr></thead><tbody>{requests.map((item) => <tr key={item._id} className="border-b border-line last:border-0"><td className="px-5 py-4">{item.buyer?.name}<span className="block text-xs text-charcoal-soft">{item.buyer?.email}</span></td><td className="px-5 py-4">{item.seller?.name}</td><td className="px-5 py-4">{item.website?.name}</td><td className="px-5 py-4">{item.proposedPrice == null ? "-" : `$${item.proposedPrice.toLocaleString()}`}</td><td className="px-5 py-4">{item.status}</td><td className="px-5 py-4">{new Date(item.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></div>;
}

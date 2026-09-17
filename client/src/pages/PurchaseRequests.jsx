import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, XCircle } from "lucide-react";
import { api } from "@/lib/api";

const money = (value) => value == null ? "Not proposed" : `$${Number(value).toLocaleString()}`;
const date = (value) => new Date(value).toLocaleDateString();

export default function PurchaseRequests({ received = false }) {
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.success || "");

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await api.get(received ? "/requests/received" : "/requests/sent");
      const items = Array.isArray(data) ? data : [];
      setRequests(items);
      const messages = await Promise.all(items.map(async (item) => {
        try {
          const result = await api.get(`/messages/${item._id}`);
          return [item._id, result?.at(-1)?.message || "No messages yet"];
        } catch { return [item._id, "No messages yet"]; }
      }));
      setLastMessages(Object.fromEntries(messages));
    } catch (err) {
      setError(err.friendlyMessage || err.message || "Unable to load requests.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadRequests(); }, [received]);
  useEffect(() => { if (notice) window.history.replaceState({}, "", window.location.pathname); }, [notice]);

  const cancel = async (id) => {
    try { await api.delete(`/requests/${id}`); setNotice("Request cancelled."); await loadRequests(); }
    catch (err) { setError(err.friendlyMessage || err.message || "Unable to cancel request."); }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="font-display text-3xl text-charcoal">{received ? "Received Requests" : "Purchase Requests"}</h1><p className="mt-1 text-charcoal-soft">{received ? "Review buyers interested in your listings." : "Track your conversations and purchase requests."}</p></div>
        {!received && <Link to="/explore" className="text-sm font-medium text-gold hover:underline">Explore websites</Link>}
      </div>
      {notice && <div className="mt-6 rounded-md border border-[#CFE0D7] bg-[#EAF3EE] px-4 py-3 text-sm text-[#2F5D4F]">{notice}</div>}
      {error && <div className="mt-6 rounded-md border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">{error}</div>}
      {loading ? <p className="mt-8 text-sm text-charcoal-soft">Loading requests...</p> : requests.length === 0 ? <div className="mt-8 rounded-xl border border-line bg-white p-8 text-center text-sm text-charcoal-soft">No purchase requests yet.</div> : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b border-line text-left text-charcoal-soft">
            {received ? <><th className="px-5 py-3 font-medium">Buyer</th><th className="px-5 py-3 font-medium">Buyer email</th></> : null}
            <th className="px-5 py-3 font-medium">Website</th><th className="px-5 py-3 font-medium">{received ? "Buyer message" : "Image"}</th><th className="px-5 py-3 font-medium">{received ? "Date" : "Seller"}</th><th className="px-5 py-3 font-medium">Proposed price</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Last message</th><th className="px-5 py-3 font-medium">Actions</th>
          </tr></thead><tbody>{requests.map((request) => <tr key={request._id} className="border-b border-line last:border-0">
            {received ? <><td className="px-5 py-4 text-charcoal">{request.buyer?.name}</td><td className="px-5 py-4 text-charcoal-soft">{request.buyer?.email}</td></> : null}
            <td className="px-5 py-4 text-charcoal">{request.website?.name}</td><td className="px-5 py-4 text-charcoal-soft">{received ? request.message : <img src={request.website?.image || request.website?.screenshots?.[0]} alt="" className="h-10 w-16 rounded object-cover" />}</td><td className="px-5 py-4 text-charcoal-soft">{received ? date(request.createdAt) : request.seller?.name}</td><td className="px-5 py-4 text-charcoal">{money(request.proposedPrice)}</td><td className="px-5 py-4"><span className="rounded-md bg-gold-soft px-2 py-1 text-xs text-charcoal">{request.status}</span></td><td className="max-w-[180px] truncate px-5 py-4 text-charcoal-soft">{lastMessages[request._id] || "Loading..."}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><Link to={`/dashboard/requests/${request._id}`} className="text-charcoal-soft hover:text-charcoal"><MessageSquare size={16} aria-label="View request" /></Link>{!received && request.status === "Pending" && <button type="button" onClick={() => cancel(request._id)} className="text-red" aria-label="Cancel request"><XCircle size={16} /></button>}</div></td>
          </tr>)}</tbody></table>
        </div>
      )}
    </div>
  );
}

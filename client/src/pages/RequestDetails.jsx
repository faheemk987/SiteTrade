import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { getStoredAuth } from "@/utils/auth";

const statuses = ["Accepted", "Rejected", "In Discussion", "Payment Pending", "Completed"];
const money = (value) => value == null ? "Not proposed" : `$${Number(value).toLocaleString()}`;

export default function RequestDetails() {
  const { id } = useParams();
  const currentUser = getStoredAuth();
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [requestData, messageData] = await Promise.all([api.get(`/requests/${id}`), api.get(`/messages/${id}`)]);
      setRequest(requestData); setMessages(Array.isArray(messageData) ? messageData : []);
    } catch (err) { setError(err.friendlyMessage || err.message || "Unable to load request."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [id]);

  const isSeller = request?.seller?._id === currentUser?.id;
  const updateStatus = async (status) => { try { await api.put(`/requests/${id}/status`, { status }); await load(); } catch (err) { setError(err.friendlyMessage || err.message || "Unable to update status."); } };
  const send = async (event) => { event.preventDefault(); if (!message.trim()) return; try { await api.post("/messages", { request: id, message }); setMessage(""); await load(); } catch (err) { setError(err.friendlyMessage || err.message || "Unable to send message."); } };

  if (loading) return <p className="text-sm text-charcoal-soft">Loading request...</p>;
  if (!request) return <div className="rounded-xl border border-line bg-white p-8 text-sm text-red">{error || "Request not found."}</div>;

  return <div className="max-w-3xl"><Link to="/dashboard/requests" className="text-sm text-charcoal-soft hover:text-charcoal">← Back to requests</Link><h1 className="mt-4 font-display text-3xl text-charcoal">{request.website?.name}</h1><div className="mt-6 grid gap-4 rounded-xl border border-line bg-white p-6 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-wider text-charcoal-soft">{isSeller ? "Buyer" : "Seller"}</p><p className="mt-1 text-charcoal">{isSeller ? request.buyer?.name : request.seller?.name}</p>{isSeller && <p className="text-sm text-charcoal-soft">{request.buyer?.email}</p>}</div><div><p className="text-xs uppercase tracking-wider text-charcoal-soft">Status</p><p className="mt-1 text-charcoal">{request.status}</p></div><div><p className="text-xs uppercase tracking-wider text-charcoal-soft">Proposed price</p><p className="mt-1 text-charcoal">{money(request.proposedPrice)}</p></div><div><p className="text-xs uppercase tracking-wider text-charcoal-soft">Original message</p><p className="mt-1 text-charcoal-soft">{request.message}</p></div></div>{isSeller && <div className="mt-5 flex flex-wrap gap-2">{statuses.map((status) => <button key={status} type="button" onClick={() => updateStatus(status)} className="rounded-md border border-line bg-white px-3 py-2 text-sm text-charcoal hover:border-gold">{status}</button>)}</div>} {error && <p className="mt-4 text-sm text-red">{error}</p>}<section className="mt-8 rounded-xl border border-line bg-white p-6"><h2 className="font-display text-2xl text-charcoal">Messages</h2><div className="mt-5 space-y-3">{messages.length === 0 ? <p className="text-sm text-charcoal-soft">No messages yet.</p> : messages.map((item) => <div key={item._id} className="rounded-lg bg-cream p-3"><p className="text-xs text-charcoal-soft">{item.sender?.name} · {new Date(item.createdAt).toLocaleString()}</p><p className="mt-1 text-sm text-charcoal">{item.message}</p></div>)}</div><form onSubmit={send} className="mt-5 flex gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a message" className="min-w-0 flex-1 rounded-md border border-line bg-cream px-3 py-2.5 text-sm focus:border-gold focus:outline-none" /><button type="submit" className="rounded-md bg-charcoal px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2F5D4F]">Send</button></form></section></div>;
}

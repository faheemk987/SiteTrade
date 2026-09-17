import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/admin/transactions").then((data) => setTransactions(Array.isArray(data) ? data : [])).catch((err) => setError(err.friendlyMessage || err.message)); }, []);
  return <div><h1 className="font-display text-3xl text-charcoal">Transactions</h1>{error && <p className="mt-4 text-sm text-red">{error}</p>}<div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white"><table className="w-full min-w-[850px] text-sm"><thead><tr className="border-b border-line text-left text-charcoal-soft"><th className="px-5 py-3">Website</th><th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Seller</th><th className="px-5 py-3">Agreed price</th><th className="px-5 py-3">Commission</th><th className="px-5 py-3">Seller amount</th><th className="px-5 py-3">Date</th></tr></thead><tbody>{transactions.map((item) => <tr key={item._id} className="border-b border-line last:border-0"><td className="px-5 py-4">{item.website?.name}</td><td className="px-5 py-4">{item.buyer?.name}</td><td className="px-5 py-4">{item.seller?.name}</td><td className="px-5 py-4">${item.agreedPrice.toLocaleString()}</td><td className="px-5 py-4">${item.platformCommission.toLocaleString()}</td><td className="px-5 py-4">${item.sellerAmount.toLocaleString()}</td><td className="px-5 py-4">{new Date(item.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></div>;
}

import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { websites as initialWebsites } from "@/data/websites";

export default function AdminWebsites() {
  const [websites, setWebsites] = useState(initialWebsites);
  const [toDelete, setToDelete] = useState(null);

  const confirmDelete = () => {
    setWebsites((prev) => prev.filter((w) => w.id !== toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal">Website Listings</h1>

      <div className="mt-8 bg-white border border-line rounded-xl overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead>
            <tr className="border-b border-line text-left text-charcoal-soft">
              <th className="px-5 py-3 font-medium">Website Name</th>
              <th className="px-5 py-3 font-medium">Seller</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((site) => (
              <tr key={site.id} className="border-b border-line last:border-0">
                <td className="px-5 py-3 text-charcoal">{site.name}</td>
                <td className="px-5 py-3 text-charcoal-soft">{site.sellerName}</td>
                <td className="px-5 py-3 text-charcoal-soft">{site.category}</td>
                <td className="px-5 py-3 text-charcoal">${site.price.toLocaleString()}</td>
                <td className="px-5 py-3 text-charcoal-soft">{site.createdAt}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-3 text-sm">
                    <Link to={`/website/${site.id}`} className="text-charcoal-soft hover:text-charcoal">View</Link>
                    <button onClick={() => setToDelete(site)} className="text-red hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete listing?">
        <p className="text-sm text-charcoal-soft">
          Are you sure you want to delete <span className="text-charcoal font-medium">{toDelete?.name}</span>?
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

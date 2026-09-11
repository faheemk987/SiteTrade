import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { websites } from "@/data/websites";

const initialWebsites = websites.slice(0, 4).map((site) => ({ ...site, status: "Active" }));

export default function MyWebsites() {
  const [myWebsites, setMyWebsites] = useState(initialWebsites);
  const [toDelete, setToDelete] = useState(null);

  const confirmDelete = () => {
    setMyWebsites((prev) => prev.filter((w) => w.id !== toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-charcoal">My Websites</h1>
        <Link to="/sell">
          <Button>+ Sell New Website</Button>
        </Link>
      </div>

      {myWebsites.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="You haven't listed any websites yet."
            description="Create your first listing to start reaching buyers."
            action={<Link to="/sell"><Button>+ Sell New Website</Button></Link>}
          />
        </div>
      ) : (
        <div className="mt-8 bg-white border border-line rounded-xl divide-y divide-line">
          {myWebsites.map((site) => (
            <div key={site.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
              <img src={site.image} alt={site.name} className="h-16 w-24 rounded-md object-cover shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-charcoal font-medium">{site.name}</p>
                <p className="text-sm text-charcoal-soft mt-0.5">
                  {site.category} • Listed {new Date(site.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs bg-gold-soft text-charcoal px-2 py-0.5 rounded-md">{site.status}</span>
                <span className="font-display text-charcoal">${site.price.toLocaleString()}</span>
                <div className="flex gap-3 text-sm">
                  <Link to={`/website/${site.id}`} className="text-charcoal-soft hover:text-charcoal">View</Link>
                  <Link to={`/dashboard/websites/edit/${site.id}`} className="text-charcoal-soft hover:text-charcoal">Edit</Link>
                  <button onClick={() => setToDelete(site)} className="text-red hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete listing?">
        <p className="text-sm text-charcoal-soft">
          Are you sure you want to delete <span className="text-charcoal font-medium">{toDelete?.name}</span>? This cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setToDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

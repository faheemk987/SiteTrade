import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import WebsiteForm from "@/components/WebsiteForm";
import { api } from "@/lib/api";

const mapWebsiteToForm = (site) => ({
  id: site._id || site.id,
  name: site.name || "",
  url: site.url || "",
  category: site.category || "",
  age: site.age || "",
  description: site.description || "",
  frontend: Array.isArray(site.technology) ? site.technology[0] || "" : site.frontendTechnology || "",
  backend: site.backendTechnology || (Array.isArray(site.technology) ? site.technology[1] || "" : ""),
  database: site.database || "",
  hosting: site.hosting || "",
  price: site.price ?? "",
  sellerEmail: site.sellerEmail || "",
  screenshotPreviews: (site.screenshots || []).map((url, i) => ({ name: `${site._id || site.id}-${i}`, url })),
});

export default function EditWebsite() {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchWebsite = async () => {
      try {
        const data = await api.get(`/websites/${id}`);
        if (!ignore) setSite(mapWebsiteToForm(data));
      } catch {
        if (!ignore) setSite(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchWebsite();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-charcoal-soft">Loading website...</div>;
  }

  if (!site) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal">Website not found.</p>
        <Link to="/dashboard/websites" className="text-gold mt-2 inline-block">← Back to My Websites</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal">Edit Website</h1>
      <p className="text-charcoal-soft mt-1">Update your listing details.</p>

      <div className="mt-8">
        <WebsiteForm initialData={site} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

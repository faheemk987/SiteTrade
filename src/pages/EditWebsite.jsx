import { useParams, Link } from "react-router-dom";
import { websites } from "@/data/websites";
import WebsiteForm from "@/components/WebsiteForm";

export default function EditWebsite() {
  const { id } = useParams();
  const site = websites.find((w) => String(w.id) === id);

  if (!site) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal">Website not found.</p>
        <Link to="/dashboard/websites" className="text-gold mt-2 inline-block">← Back to My Websites</Link>
      </div>
    );
  }

  const initialData = {
    name: site.name,
    url: site.url,
    category: site.category,
    age: site.age,
    description: site.description,
    frontend: site.technology[0] || "",
    backend: site.technology[1] || "",
    database: "",
    hosting: site.hosting,
    price: site.price,
    sellerEmail: site.sellerEmail,
    screenshotPreviews: site.screenshots.map((url, i) => ({ name: `${site.id}-${i}`, url })),
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-charcoal">Edit Website</h1>
      <p className="text-charcoal-soft mt-1">Update your listing details.</p>

      <div className="mt-8">
        <WebsiteForm initialData={initialData} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

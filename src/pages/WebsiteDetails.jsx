import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { websites } from "@/data/websites";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { isRequired, isValidEmail } from "@/utils/validate";

export default function WebsiteDetails() {
  const { id } = useParams();
  const site = websites.find((w) => String(w.id) === id);

  const [activeImage, setActiveImage] = useState(site?.screenshots?.[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  if (!site) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">Website not found</h1>
        <Link to="/explore" className="inline-block mt-6 text-gold">← Back to Explore</Link>
      </div>
    );
  }

  const openModal = () => {
    setSent(false);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!isRequired(form.name)) newErrors.name = "Your name is required.";
    if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email address.";
    if (!isRequired(form.message)) newErrors.message = "Please write a short message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Frontend-only: no real email sent.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: images */}
        <div>
          <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-cream-deep border border-line">
            <img src={activeImage} alt={site.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-3">
            {site.screenshots.map((shot, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(shot)}
                className={`h-16 w-24 rounded-md overflow-hidden border ${
                  activeImage === shot ? "border-gold" : "border-line"
                }`}
                aria-label={`View screenshot ${i + 1}`}
              >
                <img src={shot} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div>
          <span className="inline-block text-xs font-medium text-charcoal bg-gold-soft px-2.5 py-1 rounded-md">
            {site.category}
          </span>
          <h1 className="font-display text-4xl text-charcoal mt-4">{site.name}</h1>
          <p className="font-display text-2xl text-charcoal mt-2">${site.price.toLocaleString()}</p>
          <p className="text-charcoal-soft mt-4">{site.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {site.technology.map((tech) => (
              <span key={tech} className="text-xs bg-cream-deep text-charcoal px-2.5 py-1 rounded-md border border-line">
                {tech}
              </span>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-y-3 text-sm border-t border-line pt-6">
            <dt className="text-charcoal-soft">Website Age</dt>
            <dd className="text-right text-charcoal">{site.age}</dd>
            <dt className="text-charcoal-soft">Hosting</dt>
            <dd className="text-right text-charcoal">{site.hosting}</dd>
            <dt className="text-charcoal-soft">Website URL</dt>
            <dd className="text-right text-charcoal truncate">{site.url}</dd>
          </dl>

          <div className="mt-8">
            <Button onClick={openModal} className="w-full sm:w-auto">Contact Seller</Button>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl text-charcoal">About This Website</h2>
        <p className="mt-3 text-charcoal-soft leading-relaxed">{site.fullDescription}</p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-charcoal">Listing Information</h2>
        <dl className="mt-4 divide-y divide-line border-y border-line">
          {[
            ["Category", site.category],
            ["Technology", site.technology.join(", ")],
            ["Website Age", site.age],
            ["Hosting", site.hosting],
            ["Asking Price", `$${site.price.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-charcoal-soft">{label}</dt>
              <dd className="text-charcoal">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Contact Seller">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-charcoal font-medium">Message sent.</p>
            <p className="text-sm text-charcoal-soft mt-1">
              The seller will reach out to you at the email you provided.
            </p>
            <Button variant="secondary" className="mt-5" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              {errors.name && <p className="text-xs text-red mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Your Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              {errors.email && <p className="text-xs text-red mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              {errors.message && <p className="text-xs text-red mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        )}
      </Modal>
    </div>
  );
}

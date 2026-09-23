import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X } from "lucide-react";
import Button from "@/components/Button";
import { api } from "@/lib/api";
import { categories } from "@/data/websites";
import { isRequired, isPositiveNumber } from "@/utils/validate";

const emptyForm = {
  name: "",
  url: "",
  category: "",
  age: "",
  description: "",
  frontend: "",
  backend: "",
  database: "",
  hosting: "",
  price: "",
};

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal-soft/70 focus:outline-none focus:border-gold";

export default function WebsiteForm({ initialData, submitLabel = "List My Website", onSubmit }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...emptyForm, ...initialData });
  const [screenshots, setScreenshots] = useState(initialData?.screenshotPreviews || []);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({ name: `${file.name}-${Date.now()}`, url: URL.createObjectURL(file) }));
    setScreenshots((prev) => [...prev, ...previews]);
  };

  const removeScreenshot = (name) => {
    setScreenshots((prev) => prev.filter((s) => s.name !== name));
  };

  const validate = () => {
    const newErrors = {};
    if (!isRequired(form.name)) newErrors.name = "Website name is required.";
    if (!isRequired(form.category)) newErrors.category = "Please select a category.";
    if (!isRequired(form.description)) newErrors.description = "Description is required.";
    if (!isPositiveNumber(form.price)) newErrors.price = "Enter a valid asking price.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      name: form.name,
      url: form.url,
      category: form.category,
      age: form.age,
      description: form.description,
      fullDescription: form.description,
      frontendTechnology: form.frontend,
      backendTechnology: form.backend,
      database: form.database,
      technology: [form.frontend, form.backend, form.database, form.hosting].filter(Boolean),
      hosting: form.hosting,
      screenshots: screenshots.map((item) => item.url),
      price: Number(form.price),
    };

    try {
      setSubmitError("");
      setLoading(true);
      if (initialData) {
        await api.put(`/websites/${initialData.id}`, payload);
      } else {
        await api.post("/websites", payload);
      }

      setSuccess(true);
      if (onSubmit) onSubmit(form);

      if (!initialData) {
        setForm(emptyForm);
        setScreenshots([]);
      }

      setTimeout(() => navigate("/dashboard/websites"), 250);
    } catch (error) {
      setSubmitError(error.friendlyMessage || error.message || "Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (success && !initialData) {
    return (
      <div className="bg-white border border-line rounded-xl p-10 text-center">
        <p className="font-display text-2xl text-charcoal">Website submitted</p>
        <p className="text-charcoal-soft mt-2">Your listing has been added. You can manage it from My Websites.</p>
        <Button className="mt-6" onClick={() => navigate("/dashboard/websites")}>
          Go to My Websites
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {submitError && (
        <div className="rounded-md border border-red/20 bg-red/5 px-4 py-3 text-sm text-red">{submitError}</div>
      )}

      {success && initialData && (
        <div className="bg-gold-soft text-charcoal text-sm rounded-md px-4 py-3">Changes saved successfully.</div>
      )}

      <div>
        <h2 className="font-display text-xl text-charcoal mb-4">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Website Name" error={errors.name}>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Website URL">
            <input
              type="url"
              value={form.url}
              onChange={(e) => update("url", e.target.value)}
              placeholder="https://example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Category" error={errors.category}>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
              <option value="" disabled>Select a category</option>
              {categories.filter((c) => c !== "All Categories").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Website Age">
            <input
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              placeholder="e.g. 2 years"
              className={inputClass}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description" error={errors.description}>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl text-charcoal mb-4">Technology</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Frontend Technology">
            <input
              value={form.frontend}
              onChange={(e) => update("frontend", e.target.value)}
              placeholder="e.g. React"
              className={inputClass}
            />
          </Field>
          <Field label="Backend Technology">
            <input
              value={form.backend}
              onChange={(e) => update("backend", e.target.value)}
              placeholder="e.g. Node.js"
              className={inputClass}
            />
          </Field>
          <Field label="Database">
            <input
              value={form.database}
              onChange={(e) => update("database", e.target.value)}
              placeholder="e.g. MongoDB"
              className={inputClass}
            />
          </Field>
          <Field label="Hosting">
            <input
              value={form.hosting}
              onChange={(e) => update("hosting", e.target.value)}
              placeholder="e.g. Vercel"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl text-charcoal mb-4">Listing Information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Asking Price ($)" error={errors.price}>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl text-charcoal mb-4">Screenshots</h2>
        <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-line rounded-md bg-cream py-8 cursor-pointer hover:border-gold transition-colors">
          <UploadCloud size={22} className="text-charcoal-soft" />
          <span className="text-sm text-charcoal-soft">Click to upload, or drag and drop</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
        </label>

        {screenshots.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {screenshots.map((s) => (
              <div key={s.name} className="relative h-20 rounded-md overflow-hidden border border-line">
                <img src={s.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeScreenshot(s.name)}
                  className="absolute top-1 right-1 bg-charcoal/70 text-cream rounded-full p-0.5"
                  aria-label="Remove screenshot"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

import { useState } from "react";
import { User } from "lucide-react";
import Button from "@/components/Button";
import { isRequired, isValidEmail } from "@/utils/validate";

export default function Profile() {
  const [form, setForm] = useState({ fullName: "Amir Khan", email: "amir.khan@example.com" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!isRequired(form.fullName)) newErrors.fullName = "Full name is required.";
    if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email address.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    setSuccess(true);
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl text-charcoal">My Profile</h1>

      <div className="mt-8 bg-white border border-line rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-cream-deep flex items-center justify-center border border-line">
            <User size={26} className="text-charcoal-soft" />
          </div>
          <div>
            <p className="text-charcoal font-medium">{form.fullName}</p>
            <p className="text-sm text-charcoal-soft">{form.email}</p>
          </div>
        </div>

        {success && (
          <div className="mt-6 bg-gold-soft text-charcoal text-sm rounded-md px-4 py-3">Profile updated successfully.</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
            {errors.fullName && <p className="text-xs text-red mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
            {errors.email && <p className="text-xs text-red mt-1">{errors.email}</p>}
          </div>

          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    </div>
  );
}

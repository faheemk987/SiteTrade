import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import api from "@/lib/api";
import { isRequired, isValidEmail, minLength } from "@/utils/validate";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!isRequired(form.fullName)) newErrors.fullName = "Full name is required.";
    if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email address.";
    if (!minLength(form.password, 6)) newErrors.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: form.fullName,
        email: form.email,
        password: form.password,
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setErrors({ form: error.friendlyMessage || error.message || "Registration failed." });
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="bg-white border border-line rounded-xl p-8">
        <h1 className="font-display text-3xl text-charcoal">Create Your SiteTrade Account</h1>
        <p className="text-charcoal-soft mt-2">Join SiteTrade and start listing your websites.</p>

        {success ? (
          <div className="mt-8 bg-gold-soft text-charcoal text-sm rounded-md px-4 py-3">
            Account created. Redirecting to login…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {errors.form && <p className="rounded-md border border-red/20 bg-red/5 px-3 py-2 text-xs text-red">{errors.form}</p>}

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

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              {errors.password && <p className="text-xs text-red mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              {errors.confirmPassword && <p className="text-xs text-red mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full" loading={loading}>Create Account</Button>
          </form>
        )}

        <div className="mt-6 text-sm text-center">
          <Link to="/login" className="text-gold hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

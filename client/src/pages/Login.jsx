import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import api from "@/lib/api";
import { isRequired, isValidEmail } from "@/utils/validate";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email address.";
    if (!isRequired(form.password)) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await api.post("/auth/login", { email: form.email, password: form.password });
      localStorage.setItem("sitetrade_auth", JSON.stringify(data));
      const queryRedirect = new URLSearchParams(location.search).get("redirect");
      const destination = (queryRedirect?.startsWith("/") && !queryRedirect.startsWith("//") ? queryRedirect : null) || location.state?.from || "/dashboard";
      navigate(destination, {
        replace: true,
        state: location.state?.contact || location.state?.purchase
          ? { contact: location.state.contact, purchase: location.state.purchase }
          : undefined,
      });
    } catch (error) {
      setErrors({ form: error.friendlyMessage || error.message || "Login failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="bg-white border border-line rounded-xl p-8">
        <h1 className="font-display text-3xl text-charcoal">Welcome Back</h1>
        <p className="text-charcoal-soft mt-2">Login to manage your website listings.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {errors.form && <p className="rounded-md border border-red/20 bg-red/5 px-3 py-2 text-xs text-red">{errors.form}</p>}

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

          <Button type="submit" className="w-full" loading={loading}>Login</Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <button type="button" className="text-charcoal-soft hover:text-charcoal">Forgot Password?</button>
          <Link to={`/register${location.search}`} state={location.state} className="text-gold hover:underline">Don&apos;t have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { isRequired, isValidEmail } from "@/utils/validate";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
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

    // Mock login — no backend. Simulate a short delay.
    setTimeout(() => {
      localStorage.setItem("sitetrade_auth", JSON.stringify({ email: form.email }));
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="bg-white border border-line rounded-xl p-8">
        <h1 className="font-display text-3xl text-charcoal">Welcome Back</h1>
        <p className="text-charcoal-soft mt-2">Login to manage your website listings.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
          <Link to="/register" className="text-gold hover:underline">Don&apos;t have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}

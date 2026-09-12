import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Websites", href: "/explore" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing & Terms", href: "/pricing" },
];

const categories = [
  { label: "Ecommerce", href: "/explore?category=ecommerce" },
  { label: "SaaS", href: "/explore?category=saas" },
  { label: "Content & Blogs", href: "/explore?category=content" },
  { label: "Digital Tools", href: "/explore?category=tools" },
];

const supportLinks = [
  { label: "Contact Seller Guide", href: "/seller-guide" },
  { label: "Listing Guidelines", href: "/listing-guidelines" },
  { label: "FAQ", href: "/faq" },
  { label: "Direct Email Trading Notice", href: "/trading-notice" },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-10 text-left">
          <div>
            <div className="flex items-center gap-2 text-black text-xl font-bold">
              <TrendingUp size={18} className="text-gray-900" />
              <span>SiteTrade</span>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              The transparent marketplace to buy and sell verified web businesses and digital assets
              directly via email.
            </p>

            <p className="mt-8 text-xs text-gray-500">© 2025 SiteTrade Inc. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">QUICK LINKS</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600 flex flex-col">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-gray-900 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">CATEGORIES</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600 flex flex-col">
              {categories.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-gray-900 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900">
              SUPPORT &amp; TRUST
            </h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600 flex flex-col">
              {supportLinks.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-gray-900 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

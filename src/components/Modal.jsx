import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md bg-white border border-line rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-charcoal">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-charcoal-soft hover:text-charcoal">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

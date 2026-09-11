const variants = {
  primary: "bg-charcoal text-cream hover:bg-gold",
  secondary: "bg-white text-charcoal border border-line hover:border-gold",
  ghost: "text-charcoal-soft hover:text-charcoal",
  danger: "bg-white text-red border border-line hover:border-red",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  loading = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

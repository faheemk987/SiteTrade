export default function EmptyState({ title, description, action }) {
  return (
    <div className="border border-line rounded-xl bg-white p-12 text-center">
      <p className="text-charcoal font-medium">{title}</p>
      {description && <p className="text-sm text-charcoal-soft mt-1">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

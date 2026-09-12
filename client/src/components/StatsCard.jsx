export default function StatsCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white border border-line rounded-xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-charcoal-soft">{label}</p>
        {Icon && <Icon size={17} className="text-gold" />}
      </div>
      <p className="font-display text-3xl text-charcoal mt-2">{value}</p>
    </div>
  );
}

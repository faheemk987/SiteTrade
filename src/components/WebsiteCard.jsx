import { Link } from "react-router-dom";

export default function WebsiteCard({ id, name, image, category, description, technology, price }) {
  return (
    <Link
      to={`/website/${id}`}
      className="group block bg-white border border-line rounded-xl overflow-hidden hover:shadow-sm hover:border-gold/60 transition-all"
    >
      <div className="h-40 w-full bg-cream-deep overflow-hidden">
        <img src={image} alt={`${name} screenshot`} className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-charcoal leading-tight">{name}</h3>
        </div>
        <p className="text-sm text-charcoal-soft mt-0.5">{category}</p>

        {description && <p className="text-sm text-charcoal-soft mt-3 line-clamp-2">{description}</p>}

        {technology && technology.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {technology.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-gold-soft text-charcoal px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
          <span className="font-display text-lg text-charcoal">${price.toLocaleString()}</span>
          <span className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

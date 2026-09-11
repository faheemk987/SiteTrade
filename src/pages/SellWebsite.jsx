import WebsiteForm from "@/components/WebsiteForm";

export default function SellWebsite() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl text-charcoal">Sell Your Website</h1>
      <p className="text-charcoal-soft mt-2">Add your website details and make it available for potential buyers.</p>

      <div className="mt-10">
        <WebsiteForm submitLabel="List My Website" />
      </div>
    </div>
  );
}

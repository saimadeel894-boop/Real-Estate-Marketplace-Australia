import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { listFeatured } from "@/lib/properties.functions";
import { formatPrice } from "@/lib/format";
import { resolvePropertyImage } from "@/lib/property-images";
import heroImg from "@/assets/marketplace/lux-hero.jpg";
import materialImg from "@/assets/marketplace/lux-materials.jpg";
import sydneyImg from "@/assets/marketplace/city-sydney.jpg";
import melbourneImg from "@/assets/marketplace/city-melbourne.jpg";
import goldCoastImg from "@/assets/marketplace/city-goldcoast.jpg";
import perthImg from "@/assets/marketplace/city-perth.jpg";

const featuredQuery = queryOptions({
  queryKey: ["featured"],
  queryFn: () => listFeatured(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Domicile — Defining the art of living in Australia" },
      {
        name: "description",
        content:
          "Domicile is the premier Australian property marketplace for exceptional homes to buy, rent, and discover across every state.",
      },
      { property: "og:title", content: "Domicile — Defining the art of living in Australia" },
      {
        property: "og:description",
        content: "Discover Australia's most compelling homes. Curated listings, quiet interface, uncompromising standards.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(featuredQuery),
  component: HomePage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-center text-destructive">Failed to load: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-8">Not found</div>,
});

const LOCATIONS = [
  { name: "Sydney", state: "New South Wales", img: sydneyImg, offset: false },
  { name: "Melbourne", state: "Victoria", img: melbourneImg, offset: true },
  { name: "Gold Coast", state: "Queensland", img: goldCoastImg, offset: false },
  { name: "Perth", state: "Western Australia", img: perthImg, offset: true },
];

const STATS = [
  { value: "$8.4B", label: "Portfolio value" },
  { value: "140+", label: "Curated listings" },
  { value: "08", label: "Cities served" },
  { value: "15yr", label: "Craft heritage" },
];

const JOURNAL = [
  {
    tag: "Architecture",
    title: "Concrete Poetry — the new wave of brutalism in Toorak.",
    excerpt:
      "Exploring the resurgence of raw materials in Melbourne's most prestigious postcode.",
  },
  {
    tag: "Lifestyle",
    title: "The seclusion aspect: why North Byron is the new Noosa.",
    excerpt:
      "A quiet migration is reshaping the northern rivers coastline, one architect-designed retreat at a time.",
  },
  {
    tag: "Market",
    title: "Coastal capital — reading the 2026 waterfront index.",
    excerpt:
      "How premium waterfront properties have outperformed the broader market for the twelfth consecutive year.",
  },
];

function HomePage() {
  const { data: featured } = useSuspenseQuery(featuredQuery);
  const [main, ...rest] = featured;
  const side = rest[0];
  const grid = rest.slice(1, 4);

  return (
    <div className="bg-background text-ink">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cinematic Australian coastal estate at golden hour"
            className="h-full w-full object-cover"
            width={1920}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 pt-40 pb-56 md:pb-64 max-w-7xl mx-auto w-full">
          <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-semibold mb-6">
            Exclusive Australian Estates
          </span>
          <h1
            className="font-display italic text-white leading-[0.9] max-w-5xl"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
          >
            Defining the
            <br />
            Art of Living.
          </h1>
          <p className="mt-8 max-w-md text-white/80 text-base md:text-lg leading-relaxed">
            A curated marketplace of Australia's most compelling homes — hand-picked
            for architectural merit, discovered without noise.
          </p>
        </div>

        <div className="relative z-10 mx-6 md:mx-12 -mb-16">
          <HeroSearch />
        </div>
      </section>

      {/* Stats bar */}
      <section className="pt-40 pb-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-ink">{s.value}</div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured — editorial 7/5 */}
      <section className="py-28 md:py-40 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
              The Summer
              <br />
              Collection
            </h2>
            <div className="md:text-right md:max-w-xs">
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Hand-picked residences that embody the pinnacle of Australian design and
                architectural integrity.
              </p>
              <Link
                to="/buy"
                className="inline-block border-b border-primary pb-1 text-[11px] uppercase tracking-[0.25em] font-semibold text-ink hover:text-primary transition-colors"
              >
                View all properties
              </Link>
            </div>
          </div>

          {main && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <FeatureLarge p={main} />
              {side && <FeatureSide p={side} />}
            </div>
          )}

          {grid.length > 0 && (
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {grid.map((p) => (
                <FeatureSmall key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Uncompromising Excellence */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <img
              src={materialImg}
              alt="Detail of luxury architectural materials — sandstone and bronze"
              className="w-full h-[500px] md:h-[800px] object-cover"
              loading="lazy"
              width={1200}
              height={1500}
            />
          </div>
          <div className="order-1 md:order-2 px-6 md:px-16 lg:px-24 py-20 md:py-32">
            <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-semibold">
              The Domicile Standard
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
              Uncompromising
              <br />
              Excellence.
            </h2>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-lg">
              A home is more than an asset — it is an expression of identity. We list only
              the properties that meet our stringent standards of architectural merit, so
              every discovery feels considered.
            </p>
            <Link
              to="/buy"
              className="mt-12 inline-flex items-center gap-3 px-10 py-4 border border-ink text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-ink hover:text-background transition-colors"
            >
              Explore the collection
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-surface">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-muted-foreground mb-4">
            Market Reach
          </p>
          <h2 className="font-display text-4xl md:text-6xl">Primary Hubs</h2>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {LOCATIONS.map((l) => (
              <Link
                key={l.name}
                to="/buy"
                search={{ location: l.name } as any}
                className={`group relative block h-[320px] md:h-[500px] overflow-hidden ${
                  l.offset ? "md:mt-12" : ""
                }`}
              >
                <img
                  src={l.img}
                  alt={`${l.name}, ${l.state}`}
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  loading="lazy"
                  width={900}
                  height={1200}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-x-0 bottom-6 md:bottom-8 px-6 md:px-8 text-left text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-1">
                    {l.state}
                  </p>
                  <h4 className="font-display text-2xl md:text-3xl">{l.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-ink text-white">
        <div className="mx-auto max-w-5xl">
          <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-semibold block mb-10 md:mb-14">
            The Client Experience
          </span>
          <blockquote
            className="font-display italic leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 3.25rem)" }}
          >
            &ldquo;Domicile provided a level of discretion and market intelligence that is
            simply non-existent elsewhere in the Australian landscape. They didn&rsquo;t
            just find us a house — they secured our legacy.&rdquo;
          </blockquote>
          <div className="mt-12 flex items-center gap-6">
            <div className="w-12 h-px bg-primary" />
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/60">
              Managing Director, Criterion Group
            </p>
          </div>
        </div>
      </section>

      {/* Journal + Newsletter */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
        <div className="px-6 md:px-16 py-20 md:py-32">
          <h2 className="font-display text-4xl md:text-5xl mb-14">The Journal</h2>
          <div className="space-y-10">
            {JOURNAL.map((j) => (
              <article key={j.title} className="group cursor-pointer border-b border-border pb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-3">
                  {j.tag}
                </p>
                <h3 className="text-lg md:text-xl font-medium text-ink group-hover:text-primary transition-colors">
                  {j.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {j.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-primary text-white px-6 md:px-16 py-20 md:py-32 flex flex-col justify-center">
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Join the
            <br />
            Inner Circle.
          </h2>
          <p className="mt-6 text-white/85 max-w-md leading-relaxed">
            Receive early access to off-market listings and our quarterly analysis of the
            Australian high-end market.
          </p>
          <NewsletterForm />
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/60">
            Delivered weekly. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function HeroSearch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"sale" | "rent" | "sold">("sale");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("any");

  function submit(e: FormEvent) {
    e.preventDefault();
    const to = tab === "sale" ? "/buy" : tab === "rent" ? "/rent" : "/sold";
    navigate({
      to,
      search: {
        location,
        propertyType,
        minBeds: 0,
        minBaths: 0,
        minParking: 0,
        minPrice: 0,
        maxPrice: 0,
        sort: "newest",
      } as any,
    });
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="bg-white/95 backdrop-blur shadow-2xl">
        {/* Buy / Rent / Sold tabs */}
        <div className="flex border-b border-border">
          {(["sale", "rent", "sold"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors ${
                tab === t
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground hover:text-ink"
              }`}
            >
              {t === "sale" ? "Buy" : t === "rent" ? "Rent" : "Sold"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="flex flex-col md:flex-row md:divide-x md:divide-border">
          <label className="flex-1 p-6 md:p-8 block">
            <span className="block text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-2">
              Location
            </span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Where would you like to reside?"
              className="w-full text-base md:text-lg bg-transparent outline-none placeholder:text-muted-foreground/60"
            />
          </label>
          <label className="flex-1 p-6 md:p-8 block">
            <span className="block text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-2">
              Property Type
            </span>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-base md:text-lg bg-transparent outline-none cursor-pointer"
            >
              <option value="any">Any residence</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="rural">Rural</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-primary text-white px-10 py-6 md:px-16 md:py-8 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore
          </button>
        </form>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <form
      className="mt-10 border-b border-white/40 flex pb-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
        placeholder="Your email address"
        disabled={sent}
        className="flex-1 bg-transparent outline-none placeholder:text-white/60 text-sm py-2"
      />
      <button
        type="submit"
        disabled={sent}
        className="uppercase text-[11px] font-semibold tracking-[0.25em] hover:text-white/70 transition-colors disabled:opacity-70"
      >
        {sent ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}

function FeatureLarge({ p }: { p: any }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="md:col-span-7 group block"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted mb-8">
        <img
          src={resolvePropertyImage(p.images[0]?.url)}
          alt={p.images[0]?.alt ?? p.title}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="min-w-0">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
            {p.suburb}, {p.state}
          </p>
          <h3 className="font-display text-2xl md:text-3xl truncate">{p.title}</h3>
        </div>
        <p className="font-display text-xl md:text-2xl shrink-0">
          {formatPrice(p.price_cents, p.listing_type, p.rent_period)}
        </p>
      </div>
    </Link>
  );
}

function FeatureSide({ p }: { p: any }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="md:col-span-5 md:pt-24 group block"
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted mb-8">
        <img
          src={resolvePropertyImage(p.images[0]?.url)}
          alt={p.images[0]?.alt ?? p.title}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
        {p.suburb}, {p.state}
      </p>
      <h3 className="font-display text-2xl md:text-3xl mb-2">{p.title}</h3>
      <p className="font-display text-lg md:text-xl">
        {formatPrice(p.price_cents, p.listing_type, p.rent_period)}
      </p>
    </Link>
  );
}

function FeatureSmall({ p }: { p: any }) {
  return (
    <Link to="/properties/$id" params={{ id: p.id }} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-muted mb-6">
        <img
          src={resolvePropertyImage(p.images[0]?.url)}
          alt={p.images[0]?.alt ?? p.title}
          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
        {p.suburb}, {p.state}
      </p>
      <h3 className="font-display text-xl mb-1">{p.title}</h3>
      <p className="font-display text-base text-muted-foreground">
        {formatPrice(p.price_cents, p.listing_type, p.rent_period)}
      </p>
    </Link>
  );
}

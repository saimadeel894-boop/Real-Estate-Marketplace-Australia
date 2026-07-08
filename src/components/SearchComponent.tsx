import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { propertyTypes, states } from "@/data/marketplace";

type SearchComponentProps = {
  compact?: boolean;
};

export function SearchComponent({ compact = false }: SearchComponentProps) {
  const [mode, setMode] = useState<"buy" | "rent">("buy");

  return (
    <form
      action="/search"
      className={`rounded-2xl border border-border/70 bg-surface/95 p-3 shadow-luxury backdrop-blur-xl ${
        compact ? "" : "sm:p-4"
      }`}
    >
      <div className="mb-3 inline-grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-sm font-medium text-charcoal-soft">
        {(["buy", "rent"] as const).map((m) => (
          <label
            key={m}
            className={`cursor-pointer rounded-full px-6 py-2 text-center capitalize transition ${
              mode === m
                ? "bg-charcoal text-background shadow-soft"
                : "hover:text-charcoal"
            }`}
          >
            <input
              className="sr-only"
              type="radio"
              name="mode"
              value={m}
              checked={mode === m}
              onChange={() => setMode(m)}
            />
            {m}
          </label>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.5fr_0.9fr_0.9fr_auto]">
        <label className="relative block">
          <span className="sr-only">Search by location</span>
          <MapPin
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
            size={18}
            aria-hidden="true"
          />
          <input
            name="location"
            placeholder="Suburb, postcode or address"
            className="h-13 w-full rounded-xl border border-border bg-background pl-11 pr-3 py-3.5 text-sm text-charcoal outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </label>

        <label>
          <span className="sr-only">State</span>
          <select
            name="state"
            className="h-13 w-full rounded-xl border border-border bg-background px-3 py-3.5 text-sm font-medium text-charcoal outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            defaultValue=""
          >
            <option value="">Any state</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Property type</span>
          <select
            name="type"
            className="h-13 w-full rounded-xl border border-border bg-background px-3 py-3.5 text-sm font-medium text-charcoal outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            defaultValue=""
          >
            <option value="">Any type</option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="group flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 hover:shadow-luxury"
        >
          <Search size={17} aria-hidden="true" />
          Search
        </button>
      </div>
    </form>
  );
}

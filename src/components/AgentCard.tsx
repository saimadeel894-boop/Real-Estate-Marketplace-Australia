import { Mail, Phone, Star } from "lucide-react";
import { Image } from "@/components/compat/Image";
import { Link } from "@/components/compat/Link";
import type { Agent } from "@/data/marketplace";
import { getAgencyById } from "@/data/marketplace";

type AgentCardProps = {
  agent: Agent;
};

export function AgentCard({ agent }: AgentCardProps) {
  const agency = getAgencyById(agent.agencyId);

  return (
    <article className="group rounded-3xl border border-border/70 bg-surface p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-luxury">
      <div className="flex gap-4">
        <div className="relative">
          <Image
            src={agent.image}
            alt={agent.name}
            width={96}
            height={96}
            className="size-24 rounded-2xl object-cover"
          />
          <span className="absolute -bottom-2 -right-2 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-eyebrow text-primary-foreground shadow-soft">
            <Star size={11} className="fill-current" aria-hidden="true" />
            {agent.rating}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/agents/${agent.id}`}
            className="font-serif text-tile text-charcoal transition hover:text-primary"
          >
            {agent.name}
          </Link>
          <p className="mt-1 text-caption text-charcoal-soft">{agent.title}</p>
          <Link
            href={`/agencies/${agency.id}`}
            className="mt-2 block text-eyebrow text-primary hover:underline"
          >
            {agency.name}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-y border-border/70 py-4">
        <div>
          <p className="font-serif text-h3 text-charcoal">{agent.activeListings}</p>
          <p className="text-caption text-muted-foreground">Active listings</p>
        </div>
        <div>
          <p className="font-serif text-h3 text-charcoal">{agent.soldLastYear}</p>
          <p className="text-caption text-muted-foreground">Sold last year</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <a
          href={`tel:${agent.phone.replace(/\s/g, "")}`}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-border text-caption text-charcoal transition hover:border-primary hover:text-primary"
        >
          <Phone size={15} aria-hidden="true" />
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-charcoal text-caption text-background transition hover:bg-primary"
        >
          <Mail size={15} aria-hidden="true" />
          Email
        </a>
      </div>
    </article>
  );
}

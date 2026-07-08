import { Link } from "@tanstack/react-router";

const OFFICES = ["Sydney, NSW", "Melbourne, VIC", "Brisbane, QLD", "Perth, WA"];
const AGENCY = [
  { label: "About", to: "/" },
  { label: "The Journal", to: "/" },
  { label: "Contact", to: "/" },
];
const BROWSE = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Sold", to: "/sold" },
  { label: "Saved", to: "/favourites" },
];

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-24">
        <div className="grid gap-16 md:grid-cols-4 md:gap-24">
          <div>
            <div className="font-display text-2xl uppercase" style={{ letterSpacing: "0.18em" }}>
              Domicile
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground leading-relaxed">
              The premier Australian<br />property marketplace.
            </p>
          </div>
          <FooterColumn heading="Browse">
            {BROWSE.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn heading="The Agency">
            {AGENCY.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn heading="Offices">
            {OFFICES.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-24 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pt-8 border-t border-border text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <p>© {new Date().getFullYear()} Domicile — All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground mb-8">
        {heading}
      </h4>
      <ul className="space-y-4 text-sm text-ink/80 font-medium">{children}</ul>
    </div>
  );
}

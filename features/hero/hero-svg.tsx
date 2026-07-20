export function HeroSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect x="40" y="40" width="320" height="320" rx="16" className="stroke-border" strokeWidth="1" />
      <circle cx="200" cy="160" r="60" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
      <rect x="120" y="260" width="160" height="4" rx="2" className="fill-primary/20" />
      <rect x="140" y="274" width="120" height="4" rx="2" className="fill-primary/15" />
      <rect x="160" y="288" width="80" height="4" rx="2" className="fill-primary/10" />
      <path d="M200 100 L200 220" className="stroke-primary/20" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M140 160 L260 160" className="stroke-primary/20" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="200" cy="160" r="4" className="fill-primary" />
      <circle cx="140" cy="120" r="3" className="fill-primary/40" />
      <circle cx="260" cy="120" r="3" className="fill-primary/40" />
      <circle cx="140" cy="200" r="3" className="fill-primary/40" />
      <circle cx="260" cy="200" r="3" className="fill-primary/40" />
      <rect x="80" y="80" width="24" height="24" rx="4" className="fill-primary-muted stroke-primary/30" strokeWidth="1" />
      <rect x="296" y="80" width="24" height="24" rx="4" className="fill-primary-muted stroke-primary/30" strokeWidth="1" />
      <rect x="80" y="296" width="24" height="24" rx="4" className="fill-primary-muted stroke-primary/30" strokeWidth="1" />
      <rect x="296" y="296" width="24" height="24" rx="4" className="fill-primary-muted stroke-primary/30" strokeWidth="1" />
      <path d="M104 92 L120 92 M112 84 L112 100" className="stroke-primary/50" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M296 92 L312 92" className="stroke-primary/50" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M104 308 L120 308" className="stroke-primary/50" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M296 308 L312 308" className="stroke-primary/50" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

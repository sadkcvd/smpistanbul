type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        className="h-8 w-8 shrink-0 text-(--brand-accent)"
        aria-hidden="true"
      >
        <path
          d="M16 8c0 4-3 5-3 9a3 3 0 0 0 6 0c0-4-3-5-3-9Z"
          fill="currentColor"
        />
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M16 21v3" />
          <path d="M12.5 22.5l-1.5 2.5" />
          <path d="M19.5 22.5l1.5 2.5" />
        </g>
      </svg>
      <span className="text-base font-black tracking-tight text-foreground">
        SMP <span className="text-(--brand-accent)">İstanbul</span>
      </span>
    </span>
  );
}

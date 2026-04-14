interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
}

const ICONS: Record<string, JSX.Element> = {
  waveform: <path d="M2 12h3l2-7 3 14 3-10 2 6 2-3h5" />,
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

const DELAY_CLASS = ["", "delay-80", "delay-160", "delay-240"];

export default function FeatureCard({
  title,
  description,
  icon,
  index = 0,
}: FeatureCardProps) {
  const delay = DELAY_CLASS[index] ?? "";

  return (
    <div className={`card group animate-fade-up ${delay}`}>
      <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-secondary group-hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {ICONS[icon] ?? ICONS.layers}
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

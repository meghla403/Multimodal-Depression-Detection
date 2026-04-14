interface LoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ label = "Analyzing...", size = "md" }: LoaderProps) {
  const dim = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-14 w-14" : "h-10 w-10";

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className={`relative ${dim}`}>
        <div className="absolute inset-0 rounded-full border-4 border-border" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-accent" />
      </div>
      {label && (
        <p className="text-sm font-medium text-muted animate-pulse">{label}</p>
      )}
    </div>
  );
}

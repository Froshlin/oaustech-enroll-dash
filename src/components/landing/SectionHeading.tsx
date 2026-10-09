import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) => {
  const isCentered = align === "center";

  return (
    <div className={cn("max-w-2xl", isCentered && "mx-auto text-center", className)}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary",
            isCentered && "justify-center"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;

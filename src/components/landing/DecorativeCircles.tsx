import { cn } from "@/lib/utils";

interface DecorativeCirclesProps {
  variant: "hero" | "cta";
  className?: string;
}

const DecorativeCircles = ({ variant, className }: DecorativeCirclesProps) => {
  if (variant === "hero") {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
        {/* nested rings, top right */}
        <div className="absolute -right-40 -top-48 hidden h-[620px] w-[620px] rounded-full border border-primary/10 lg:block" />
        <div className="absolute -right-10 -top-16 hidden h-[340px] w-[340px] rounded-full border border-primary/15 lg:block" />

        {/* nested rings, gold, lower left */}
        <div className="absolute -left-28 bottom-[-180px] h-80 w-80 rounded-full border border-accent/20 sm:block" />
        <div className="absolute -left-6 bottom-[-70px] hidden h-40 w-40 rounded-full border border-accent/30 sm:block" />

        {/* small scattered accents */}
        <div className="absolute left-[8%] top-[18%] hidden h-3 w-3 rounded-full bg-accent/70 lg:block" />
        <div className="absolute left-[14%] top-[64%] hidden h-14 w-14 rounded-full border border-primary/15 lg:block" />
        <div className="absolute right-[6%] top-[58%] h-2.5 w-2.5 rounded-full bg-primary/50" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* nested rings, top right */}
      <div className="absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full border border-white/15" />
      <div className="absolute -right-6 -top-6 hidden h-52 w-52 rounded-full border border-white/25 sm:block" />
      <div className="absolute right-[13%] top-[14%] hidden h-5 w-5 rounded-full bg-accent sm:block" />

      {/* nested rings, lower left */}
      <div className="absolute -left-20 bottom-[-140px] h-64 w-64 rounded-full border border-white/15" />
      <div className="absolute left-4 bottom-[-40px] hidden h-28 w-28 rounded-full border border-white/20 sm:block" />

      {/* small scattered accents */}
      <div className="absolute left-[18%] top-8 h-3 w-3 rounded-full bg-white/60" />
      <div className="absolute right-[28%] bottom-6 hidden h-2 w-2 rounded-full bg-accent/80 sm:block" />
    </div>
  );
};

export default DecorativeCircles;

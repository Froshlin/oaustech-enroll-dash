import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconTileProps {
  icon: LucideIcon;
  tone?: "primary" | "accent" | "slate";
  className?: string;
}

const toneClasses: Record<Required<IconTileProps>["tone"], string> = {
  primary: "bg-primary/5 border-primary/15 text-primary",
  accent: "bg-accent/10 border-accent/30 text-accent-foreground dark:text-accent",
  slate: "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-300",
};

const IconTile = ({ icon: Icon, tone = "primary", className }: IconTileProps) => {
  return (
    <div
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
        toneClasses[tone],
        className
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </div>
  );
};

export default IconTile;

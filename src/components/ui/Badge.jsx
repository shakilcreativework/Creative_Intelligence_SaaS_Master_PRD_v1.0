import { cn } from "@/lib/utils";

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    primary: "bg-brand-500/10 text-brand-300 border-brand-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    info: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

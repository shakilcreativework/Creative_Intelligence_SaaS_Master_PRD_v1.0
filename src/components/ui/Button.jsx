import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    children,
    ...props
  },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-brand-600 hover:bg-brand-500 text-white shadow-sm shadow-brand-600/20",
    secondary:
      "bg-surface-card hover:bg-slate-800 text-slate-200 border border-surface-border",
    outline:
      "border border-brand-500/40 text-brand-300 hover:bg-brand-500/10",
    ghost:
      "text-slate-300 hover:bg-slate-800/60 hover:text-white",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-600/20",
    success:
      "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

export default Button;

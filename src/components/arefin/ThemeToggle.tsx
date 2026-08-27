import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "arefin-theme";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  // Default to LIGHT regardless of system preference — spec is light-first.
  // The toggle lets the user choose dark; the choice then persists.
  return "light";
};

const applyTheme = (theme: Theme) => {
  // Apply to every `.arefin` root on the page (there should only be one).
  document.querySelectorAll<HTMLElement>(".arefin").forEach((el) => {
    el.classList.toggle("dark", theme === "dark");
  });
};

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync state -> DOM on mount and on change
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — ignore */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
};

export default ThemeToggle;

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const OPTIONS = [
  { value: "light", label: "Light", icon: FiSun },
  { value: "system", label: "System", icon: FiMonitor },
  { value: "dark", label: "Dark", icon: FiMoon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-24" aria-hidden />;
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-black/10 p-0.5 dark:border-white/10">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          onClick={() => setTheme(value)}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors ${
            theme === value
              ? "bg-black/10 text-black dark:bg-white/15 dark:text-white"
              : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
          }`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

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
    return <div className="h-9 w-[6.5rem]" aria-hidden />;
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-line p-0.5">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          onClick={() => setTheme(value)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm transition-colors duration-200 ${
            theme === value
              ? "bg-fg/10 text-fg"
              : "text-subtle hover:text-fg"
          }`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

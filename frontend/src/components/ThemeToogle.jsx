import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    const applyTheme = (selectedTheme) => {
      const root = document.documentElement;

      if (selectedTheme === "dark") {
        root.classList.add("dark");
      } else if (selectedTheme === "light") {
        root.classList.remove("dark");
      } else {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", isDark);
      }
    };

    applyTheme(theme);

    let mediaQuery;
    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [theme]);

  const handleChange = (e) => {
    const selected = e.target.value;
    setTheme(selected);
    localStorage.setItem("theme", selected);
  };

  return (
    <select value={theme} onChange={handleChange} className="px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:text-white">
      <option value="system">🖥️ System</option>
      <option value="light">☀️ Light</option>
      <option value="dark">🌙 Dark</option>
    </select>
  );
}

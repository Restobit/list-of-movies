import React, { createContext, useState } from "react";

export const ThemeContext = createContext<any>({ theme: "light", undefined });

const THEME_KEY = "theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const [theme, setTheme] = useState<string | undefined>(
    storedTheme || "light"
  );

  const handleThemeChange = (newTheme: string) => {
    localStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

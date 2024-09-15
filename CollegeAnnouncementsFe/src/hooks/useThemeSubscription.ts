import { useEffect } from "react";

import { useAppSelector } from "@store";

export const useThemeSubscription = (): void => {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement; // Get the root element
    root.setAttribute("data-bs-theme", themeMode); // Set the theme attribute
  }, [themeMode]);
};

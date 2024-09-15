import { useAppDispatch, useAppSelector } from "@store";
import { setTheme as _setTheme, toggleTheme as _toggleTheme } from "@reducers";

export type ThemeMode = "light" | "dark";

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector((state) => state.theme.mode);

  const handleSetTheme = (theme: ThemeMode) => {
    dispatch(_setTheme(theme));
  };
  const handleToggleTheme = () => {
    dispatch(_toggleTheme());
  };

  return { mode: themeMode, setTheme: handleSetTheme, toggleTheme: handleToggleTheme };
};

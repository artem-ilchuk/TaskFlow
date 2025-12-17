export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface PasswordToggleProps {
  visible: boolean;
  onClick: () => void;
}

export interface ToggleswitchProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

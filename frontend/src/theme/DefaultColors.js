import { createTheme } from "@mui/material";

const shadows = [
  "none",
  "0px 2px 3px rgba(0,0,0,0.10)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)",
  "0 9px 17.5px rgb(0,0,0,0.05)",
  "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)",
  "0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)",
];

const typography = {
  fontFamily: "'Plus Jakarta Sans', sans-serif;",
  h1: {
    fontWeight: 600,
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "1.75rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.3125rem",
    lineHeight: "1.6rem",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: "1.6rem",
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.2rem",
  },
  button: {
    textTransform: "capitalize",
    fontWeight: 400,
  },
  body1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.334rem",
  },
  body2: {
    fontSize: "0.75rem",
    letterSpacing: "0rem",
    fontWeight: 400,
    lineHeight: "1rem",
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
};

export const BluelighTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      100: "#dfdffc",
      200: "#bebff9",
      300: "#9e9ff5",
      light: "#7d7ff2",
      main: "#5d5fef",
      dark: "#4a4cbf",
      700: "#38398f",
      800: "#252660",
      900: "#131330",
    },
    secondary: {
      100: "#fffad6",
      200: "#fff4ac",
      300: "#ffef83",
      light: "#ffe959",
      main: "#ffe430",
      dark: "#ccb626",
      700: "#99891d",
      800: "#665b13",
      900: "#332e0a",
    },
    red: {
      100: "#fad6d6",
      200: "#f5acad",
      300: "#f08385",
      main: "#eb595c",
      main: "#e63033",
      dark: "#b82629",
      700: "#8a1d1f",
      800: "#5c1314",
      900: "#2e0a0a",
    },
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1b2632",
      secondary: "#000",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    divider: "#d1d5db",
    action: {
      active: "#6b7280",
    },
    info: {
      main: "#89bcfa",
    },
    success: {
      main: "#5d5fef",
    },
    error: {
      main: "#e63033",
    },
    warning: {
      main: "#ffe430",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    shadows,
    typography,
  },
});

export const BlueDarkTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "dark",
    primary: {
      100: "#dfdffc",
      200: "#bebff9",
      300: "#9e9ff5",
      light: "#7d7ff2",
      main: "#5d5fef",
      dark: "#4a4cbf",
      700: "#38398f",
      800: "#252660",
      900: "#131330",
    },
    secondary: {
      100: "#fffad6",
      200: "#fff4ac",
      300: "#ffef83",
      light: "#ffe959",
      main: "#ffe430",
      dark: "#ccb626",
      700: "#99891d",
      800: "#665b13",
      900: "#332e0a",
    },
    red: {
      100: "#fad6d6",
      200: "#f5acad",
      300: "#f08385",
      light: "#eb595c",
      main: "#e63033",
      dark: "#b82629",
      700: "#8a1d1f",
      800: "#5c1314",
      900: "#2e0a0a",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#d1d5db",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    divider: "#d1d5db",
    action: {
      active: "#6b7280",
    },
    info: {
      main: "#89bcfa",
    },
    success: {
      main: "#5d5fef",
    },
    error: {
      main: "#e63033",
    },
    warning: {
      main: "#ffe430",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    shadows: shadows,
    ...typography,
  },
});

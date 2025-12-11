export const designTokens = {
  spaceSchiema: {
    xs: "0.5",
    s: "1",
    m: "2",
    l: "4",
    xl: "8",
    xxl: "16",
    none: "0",
  },

  fractionsSchiema: {
    "1/4": "grid-cols-4",
    "1/3": "grid-cols-3",
    "1/2": "grid-cols-2",
    "2/3": "grid-cols-3",
    "3/4": "grid-cols-4",
    "auto-start": "grid-cols-[auto_1fr]",
    "auto-end": "grid-cols-[1fr_auto]",
  },
  alignSchiema: {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  },
  justifySchiema: {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  },
} as const;

export type SpaceKeys = keyof typeof designTokens.spaceSchiema;
export type FractionKeys = keyof typeof designTokens.fractionsSchiema;
export type AlignKeys = keyof typeof designTokens.alignSchiema;
export type JustifyKeys = keyof typeof designTokens.justifySchiema;

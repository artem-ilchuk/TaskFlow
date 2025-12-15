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
  padding: {
    xs: "p-2",
    s: "p-4",
    m: "p-8",
    l: "p-16",
    xl: "p-32",
    xxl: "p-64",
    none: "p-0",
  },
  paddingSides: {
    xs: { t: "pt-2", r: "pr-2", b: "pb-2", l: "pl-2" },
    s: { t: "pt-4", r: "pr-4", b: "pb-4", l: "pl-4" },
    m: { t: "pt-8", r: "pr-8", b: "pb-8", l: "pl-8" },
    l: { t: "pt-16", r: "pr-16", b: "pb-16", l: "pl-16" },
    xl: { t: "pt-32", r: "pr-32", b: "pb-32", l: "pl-32" },
    xxl: { t: "pt-64", r: "pr-64", b: "pb-64", l: "pl-64" },
    none: { t: "pt-0", r: "pr-0", b: "pb-0", l: "pl-0" },
  },
  gapClasses: {
    xs: "gap-0.5",
    s: "gap-1",
    m: "gap-2",
    l: "gap-4",
    xl: "gap-8",
    xxl: "gap-16",
    none: "gap-0",
  },
  fractionsSchiema: {
    "1/7": "grid-cols-7",
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

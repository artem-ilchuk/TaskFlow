import { Priority } from "../types/operations";

export const PRIORITY_MAP: Record<
  Priority,
  { label: string; color: string; badge: string }
> = {
  low: { label: "Low", color: "text-success", badge: "bg-success" },
  medium: { label: "Medium", color: "text-warning", badge: "bg-warning" },
  high: { label: "High", color: "text-error", badge: "bg-error" },
};

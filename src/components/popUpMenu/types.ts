import type { ReactNode } from "react";

export type PopUpMenuItem = {
  /** Unique key for the item */
  key: string;
  /** Label text shown in the menu */
  label: ReactNode;
  /** Optional icon shown next to the label */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Style as destructive (red) — for delete, deactivate, etc. */
  danger?: boolean;
  /** Disable the item */
  disabled?: boolean;
  /** Show a separator above this item */
  divider?: boolean;
};

export type PopUpMenuProps = {
  /** Array of menu items */
  items: PopUpMenuItem[];
  /** Optional custom trigger element (defaults to a 3-dots button) */
  trigger?: ReactNode;
  /** Menu alignment relative to the trigger */
  align?: "start" | "center" | "end";
  /** Menu side relative to the trigger */
  side?: "top" | "right" | "bottom" | "left";
  /** Class for the menu content */
  className?: string;
};

import { icons } from "./Icons";
import clsx from "clsx";

const SVG = ({
  name,
  size = 24,
  className = "",
  color = "transparent",
  ...props
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    if (import.meta.env.DEV) {
      console.warn(
        `[SVG] Icon "${name}" not found. Available: ${Object.keys(icons).join(", ")}`,
      );
    }
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={clsx("inline-block shrink-0", className)}
      style={color ? { color } : undefined}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export default SVG;

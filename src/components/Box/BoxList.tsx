import { type ReactNode } from "react";

import Box from "./Box";

export type BoxListItem = {
  value: string;
  header: ReactNode;
  content: ReactNode;
};

type BoxListProps = {
  items: BoxListItem[];
  layout?: "stack" | "grid";
  className?: string;
  bodyClassName?: string;
};

const BoxList = ({
  items,
  layout = "stack",
  className,
  bodyClassName,
}: BoxListProps) => {
  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : "flex flex-col gap-4";

  return (
    <div className={`${layoutClass} ${className ?? ""}`}>
      {items.map((item) => (
        <Box
          key={item.value}
          header={item.header}
          bodyClassName={bodyClassName}
        >
          {item.content}
        </Box>
      ))}
    </div>
  );
};

export default BoxList;

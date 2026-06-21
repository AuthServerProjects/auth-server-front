import { type ReactNode } from "react";

type BoxProps = {
  header: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

const Box = ({ header, children, className, bodyClassName }: BoxProps) => (
  <div
    className={`border border-gray-50 rounded-lg overflow-hidden ${className ?? ""}`}
  >
    <div className="p-3 bg-gray-30">{header}</div>
    <div className={`border-t border-gray-50 ${bodyClassName ?? ""}`}>
      {children}
    </div>
  </div>
);

export default Box;
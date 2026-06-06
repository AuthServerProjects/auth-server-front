import { useState, type ReactNode } from "react";
import SVG, { icons } from "../../../components/SVG/SVG";

type CardProps = {
  id: number;
  name: string;
  icon: ReactNode;
};

const CardComponent = ({ id, name, icon }: CardProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      className={`flex items-center gap-2 p-3 m-1 text-gray-300 border border-gray-50 rounded-lg cursor-pointer  ${
        selected ? "bg-green-20" : "hover:bg-gray-30"
      }`}
    >
      {selected ? <SVG name="tickIcon" className="text-green-30" /> : icon}
      {name}
    </div>
  );
};

export default CardComponent;

import { useState } from "react";
import SVG from "../../../components/SVG/SVG";

type ClientCardProps = {
  id: number;
  name: string;
};

const ClientCard = ({ id, name }: ClientCardProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      className={`flex items-center gap-2 p-3 m-1 text-gray-300 border border-gray-50 rounded-lg cursor-pointer  ${
        selected ? "bg-green-20" : "hover:bg-gray-30"
      }`}
    >
      {selected ? (
        <SVG name="tickIcon" className="text-green-30" />
      ) : (
        <SVG name="userIcon" className="text-gray-300" />
      )}
      {name}
    </div>
  );
};

export default ClientCard;

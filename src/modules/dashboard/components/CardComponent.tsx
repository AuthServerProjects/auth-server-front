interface CardComponentProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  iconClassName?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title = "",
  count = 0,
  icon,
  iconClassName = "",
}) => {
  return (
    <div className="p-4 bg-white border border-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2 items-start">
          <div className="text-gray-70">{title}</div>
          <div className="text-2xl text-black">{count}</div>
        </div>
        <div
          className={`rounded-lg p-2 flex justify-center items-center text-2xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

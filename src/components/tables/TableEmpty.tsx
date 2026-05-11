import type { ReactNode } from "react";

type TableEmptyProps = {
  colSpan: number;
  text?: ReactNode;
};

const TableEmpty = ({ colSpan, text = "داده‌ای برای نمایش وجود ندارد" }: TableEmptyProps) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="py-10 text-center text-gray-500">
          {text}
        </td>
      </tr>
    </tbody>
  );
};

export default TableEmpty;

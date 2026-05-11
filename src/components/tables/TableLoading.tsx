type TableLoadingProps = {
  colSpan: number;
};

const TableLoading = ({ colSpan }: TableLoadingProps) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="py-10 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            در حال بارگذاری...
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoading;

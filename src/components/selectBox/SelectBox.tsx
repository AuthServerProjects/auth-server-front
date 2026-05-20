import Select from "react-select";

interface selectBoxType {
  options: { value: string; label: string }[];
  selectedOption: { value: string; label: string };
  setSelectedOption: (value) => void;
}

const SelectBox = ({
  options,
  selectedOption,
  setSelectedOption,
}: selectBoxType) => {
  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="انتخاب کلاینت"
        unstyled
        classNames={{
          control: () =>
            "text-gray-300 border border-gray-50 rounded-lg px-2 py-1",
          menu: () => "bg-white border border-gray-50 rounded-lg mt-1",
          option: ({ isFocused, isSelected }) =>
            `rounded-lg text-gray-300 px-3 py-2 cursor-pointer ${
              isSelected ? "bg-gray-50" : isFocused ? "bg-gray-30" : ""
            }`,
          placeholder: () => "text-gray-300",
        }}
      />
    </div>
  );
};

export default SelectBox;

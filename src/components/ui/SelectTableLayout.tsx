interface SelectProps {
  handleSelectChange?: any;
  classNameStyle?: string;
}

function SelectTableLayout({
  handleSelectChange,
  classNameStyle,
}: SelectProps) {
  const handleSelect = (_arg) => {
    handleSelectChange(_arg);
  };
  return (
    <select
      onChange={(e) => handleSelectChange(e.target.value)}
      className={`text-[12px] w-fit h-fit px-5 py-3 border-[1px] border-gray-100 rounded-md ${classNameStyle}`}
    >
      <option value="0">Default Layout</option>
      <option value="1">Layout 1</option>
    </select>
  );
}

export default SelectTableLayout;

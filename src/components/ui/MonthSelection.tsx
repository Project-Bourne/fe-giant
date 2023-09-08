import { months } from "@/utils/constants";

function MonthSelect({ handleMonthChange }) {
  const handleChange = (_arg) => {
    handleMonthChange(_arg);
  };

  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      className="capitalize border-[1px] border-gray-100 px-2 py-1"
    >
      {months.map((month, index) => (
        <option value={month} key={index}>
          {month}
        </option>
      ))}
    </select>
  );
}

export default MonthSelect;

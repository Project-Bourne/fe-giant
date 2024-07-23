import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const data = ["Title", "Source"];

function FilterSelect({ filter }) {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [filters, setFilters] = useState(data);
  const [selectedSector, setSelectedSector] = useState("Title");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (filterText === "") {
      setFilters(data);
    } else {
      const sectFilter = filters.filter((sector) =>
        sector.toLowerCase().includes(filterText.toLowerCase()),
      );
      setFilters(sectFilter);
    }
  }, [filterText]);

  const handleFilterSelection = (_arg) => {
    setSelectedSector(_arg);
    filter(_arg);
    // close dropdown
    setDropdownToggle(false);
  };

  return (
    <div className="relative ">
      <div
        className="w-full px-2 py-3 border-[1px] bg-white text-black border-gray-100 rounded font-bold flex justify-between"
        onClick={() => setDropdownToggle((prevState) => !prevState)}
      >
        <span>{selectedSector}</span>
        {!dropdownToggle ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </div>

      {dropdownToggle && (
        <div className="absolute w-full h-auto overflow-y-auto bg-white shadow-sm px-2 py-2 border-[1px] border-gray-100 rounded font-bold">
          {/* <input
            value={filterText}
            className="w-full border-[1px] border-gray-50 px-2 py-1 mb-2"
            onChange={(e) => setFilterText(e.target.value)}
          /> */}
          <ul>
            {filters.map((filter, index) => (
              <li
                className="hover:cursor-pointer hover:bg-gray-100 py-1 px-1"
                onClick={() => handleFilterSelection(filter)}
                key={index}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterSelect;

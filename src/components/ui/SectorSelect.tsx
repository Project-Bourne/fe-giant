import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const data = [
  "All",
  "Agriculture",
  "Arts and Culture",
  "Defence, Military and Security",
  "Education",
  "Employment and Labour",
  "Energy and Power",
  "Finance and Banking",
  "Healthcare",
  "Housing",
  "Information and Media",
  "Infrastructure and Minerals",
  "Information Technology",
  "Politics and Government",
  "Public Events",
  "Sports",
  "Tourism",
  "Transportation",
];

function SectorSelect({ sector }) {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [sectors, setSectors] = useState(data);
  const [selectedSector, setSelectedSector] = useState("Agriculture");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (filterText === "") {
      setSectors(data);
    } else {
      const sectFilter = sectors.filter((sector) =>
        sector.toLowerCase().includes(filterText.toLowerCase()),
      );
      setSectors(sectFilter);
    }
  }, [filterText]);

  const handleSectorSelection = (_arg) => {
    setSelectedSector(_arg);
    sector(_arg);
    // close dropdown
    setDropdownToggle(false);
  };

  return (
    <div className="relative ">
      <div
        className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light flex justify-between"
        onClick={() => setDropdownToggle((prevState) => !prevState)}
      >
        <span>{selectedSector}</span>
        {!dropdownToggle ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </div>

      {dropdownToggle && (
        <div className="absolute w-full h-[30vh] overflow-y-auto bg-white shadow-sm px-2 py-2 border-[1px] border-gray-100 rounded font-light">
          <input
            value={filterText}
            className="w-full border-[1px] border-gray-50 px-2 py-1 mb-2"
            onChange={(e) => setFilterText(e.target.value)}
          />
          <ul>
            {sectors.map((sector, index) => (
              <li
                className="hover:cursor-pointer hover:bg-gray-100 py-1 px-1"
                onClick={() => handleSectorSelection(sector)}
                key={index}
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SectorSelect;

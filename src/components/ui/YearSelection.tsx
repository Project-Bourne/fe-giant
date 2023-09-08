import React from "react";

function YearsSelect({ backDateTo, handleYearsChange }) {
  const getLast10Years = () => {
    const currentYear = new Date().getFullYear();
    const lastXYears = [];

    for (let i = currentYear; i >= currentYear - backDateTo; i--) {
      lastXYears.push(i);
    }

    return lastXYears;
  };

  const _lastXYears = getLast10Years();

  const handleChange = (_arg: any) => handleYearsChange(_arg);

  return (
    <select onChange={(e: any) => handleChange(e.target.value)}>
      {_lastXYears.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearsSelect;

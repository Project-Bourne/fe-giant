import React, { useState } from 'react';
import HeadIcon from './components/HeadIcon';
import HeadIconTwo from './components/HeadIconTwo';
import Content from './components/Content';
import dummy from '../../../dummy.json';

function Starred() {
  const [activeOption, setActiveOption] = useState('All');
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const filteredData = activeOption === 'All'
    ? dummyData
    : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-contentbg h-[100%] border pt-5 mx-10 rounded-[1rem]">
      <HeadIcon activeOption={activeOption} onOptionChange={handleOptionChange} />
      <HeadIconTwo activeOption={activeOption} onOptionChange={handleOptionChange} />
      <Content data={filteredData} />
    </div>
  );
}

export default Starred;

import React, { useState } from 'react';
import HomeHeader from '../starred/components/HeadIcon';
import HomeHeaderTwo from '../starred/components/HeadIconTwo';
import HomeContent from '../starred/components/Content';
import dummy from '../../../dummy.json';
import Link from 'next/link';

function Index() {
  const [activeOption, setActiveOption] = useState('All');
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const filteredData = activeOption === 'All' ? dummyData : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-counterbg border h-[100%] my-4 mx-10 pt-5 rounded-[1rem]">
      <HomeHeader activeOption={activeOption} onOptionChange={handleOptionChange} />
      <HomeHeaderTwo activeOption={activeOption} onOptionChange={handleOptionChange} />
      <HomeContent data={filteredData} />
    </div>
  );
}

export default Index;

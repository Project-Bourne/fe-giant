import React, { useState } from 'react';
import HomeHeader from '../starred/components/HeadIcon';
import HomeHeaderTwo from '../starred/components/HeadIconTwo';
import HomeContent from '../starred/components/Content';
import Link from 'next/link';
import Image from 'next/image';
import { ListItem } from '../home/components';
import dummy from '../../utils/dummy.json';

function Archives() {
  const [activeOption, setActiveOption] = useState('All');
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleCheckboxChange = () => {}

  const filteredData = activeOption === 'All' ? dummyData : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-listBg border h-[100%] my-4 mx-3 md:mx-10 pt-5 rounded-[1rem]">
      <HomeHeader activeOption={activeOption} onOptionChange={handleOptionChange} />
      <HomeHeaderTwo activeOption={activeOption} onOptionChange={handleOptionChange} />
      {filteredData?.map((item, index) => {
        return (
          <div
            key={index}>
            <ListItem 
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={handleCheckboxChange}
              time={item.time}
              buttonType='view'
              viewDeleteButtons={
                <Image
                  src={require('../../assets/icons/Archive-delete.svg')}
                  alt='delete-archives'
                  height={30}
                  width={30}
                />
              }
            />
          
            
          </div>
        );
      })}
    </div>
  );
}

export default Archives;

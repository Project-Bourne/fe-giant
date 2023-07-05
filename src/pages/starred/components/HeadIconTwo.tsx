import React, { useState } from 'react';
import Image from 'next/image';

function HeadIconTwo({ activeOption, onOptionChange }) {
  const [div1TextColor, setDiv1TextColor] = useState('black');
  const [div2TextColor, setDiv2TextColor] = useState('black');
  const [activeDiv, setActiveDiv] = useState(activeOption);


  const toggleOption = (option) => {
    setActiveDiv(option);
    onOptionChange(option);
  };

  console.log(activeDiv)

  return (
    <div className="flex items-center gap-38 border-b-2">
      <div
        // onClick={toggleDiv1Color}
        onClick={() => toggleOption('All')}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv !== 'New' ? 'border-b-2 border-sirp-primary w-[15rem]' : 'border-b-2 border-transparent w-[15rem]'
        }`}
      >
        <Image
          src={require('../../../assets/icons/template 1.svg')}
          alt="documents"
          className="cursor-pointer ml-2 text-green-500"
          width={20}
          style={{ fill: activeDiv === 'All' ? 'text-red-500' : 'text-green-500' }}
        />
        <a className="group transition-all duration-300 ease-in-out" href="#">
          <span
            // className="text-sirp-primary active:text-blue-600"
            className={` ${activeDiv === 'All' ? 'text-sirp-primary' : ''}`}
            // style={{ color: div1TextColor }}
          >
            All
          </span>
        </a>
      </div>
      <div
        // onClick={toggleDiv2Color}
        onClick={() => toggleOption('New')}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv === 'New' ? 'border-b-2 border-sirp-primary w-[15rem]' : 'border-b-2 border-transparent w-[15rem]'
        }`}
      >
        <Image
          src={require('../../../assets/icons/transform 2.svg')}
          alt="documents"
          className="cursor-pointer ml-2"
          width={20}
        />
        <a className="group transition-all duration-300 ease-in-out">
          <span
            // className="text-sirp-primary active:text-blue-600"
            // style={{ color: div2TextColor }}
            className={` ${activeDiv === 'New' ? 'text-sirp-primary' : ''}`}
          >
            New
          </span>
        </a>
      </div>
    </div>
  );
}

export default HeadIconTwo;
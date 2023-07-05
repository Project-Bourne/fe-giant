import React from 'react'
import Image from 'next/image'
const Min_and_Max_icon = () => {
  return (
    <div>
        <div className="flex justify-end items-center gap-2 mr-[5rem] pt-[2rem]">
        <Image
            src={require('../../../assets/icons/arrows-minimize 1.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
        <Image
            src={require('../../../assets/icons/arrows-max.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
        </div>
    </div>
  )
}

export default Min_and_Max_icon
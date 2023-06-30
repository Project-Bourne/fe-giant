import Image from 'next/image'
import { type } from 'os'
import React from 'react'

type NavBarItemType = {
    item: {
        name: string,
        id: number,
        icon: string
    },
    index: number
}

function NavBarItem({item, index}: NavBarItemType) {
  return (
    <div className='flex flex-row my-10 w-[100%] items-center justify-start self-center rounded-md cursor-pointer'
        key={index}
    >
        <Image
            src={require(`../../../assets/icons/${item.icon}`)}
            alt="Dashboard icon"
            width={22}
            height={22}
            style={{marginRight: 20}}
            // className='fill-sirp-grey'
            priority
        />

        <h2 className='text-[13px] text-sirp-grey font-semibold'>{item.name}</h2>
    </div>
  )
}

export default NavBarItem
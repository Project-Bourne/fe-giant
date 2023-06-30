import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import "../../../../styles/global.css"

type TabCompType = {
    item: {
        name: string,
        icon: string,
        id: number,
        route: string
    },
    index: number,
    // path: string
}

const TabComp = ({item, index}: TabCompType) => {
  const route = useRouter().pathname;

  // console.log(route, item.route, route == item.route)
  // console.log("checker>>>: ", item.route.includes(path), path)

  return (
    <div className={
      item.name == route ? 'px-8 pt-3 flex flex-row items-center border-b border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'
      : 'px-8 pt-3 flex flex-row items-center border-b pb-3 mr-15 mb-[-2px] cursor-pointer'
    }>
      <Image
        src={item.route.includes(route) ? require(`../../../../assets/icons/on.${item.icon}`) : require(`../../../../assets/icons/${item.icon}`)}
        alt="settings tab"
        width={18}
        height={18}
        style={{marginRight: 15}}
        priority
      />

      <h2 className={item.name == route ? 'text-[19px] font-semibold text-sirp-primary' : 'text-[12px] font-semibold '}>{item.name}</h2>
    </div>
  )
}

export default TabComp;
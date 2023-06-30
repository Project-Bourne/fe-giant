import { TabComp } from '@/pages/settings/components';
import { SettingsData } from '@/utils/constants';
import React, { ReactNode } from 'react'
import "../../styles/global.css"
import { useRouter } from 'next/router';


type LayoutType = {
    children: ReactNode,
}

const SettingsLayout = ({children}: LayoutType) => {
    
    const route = useRouter().pathname;

    console.log({route})

  return (
    <div className='w-full h-full'>
        
        {/* Header */}
        <div className='flex flex-row w-full py-7 px-7 items-center justify-between'>
            <h1 className='text-[20px] font-semibold'>Profile Settings</h1>
        </div>

        {/* Settings tabs */}
        <div className='w-[50%] flex flex-row items-center border-b'>
            {
                SettingsData.map((item, index) => (
                    <TabComp item={item} index={index} key={index} />
                ))
            }
        </div>

        {children}
    </div>
  )
}

export default SettingsLayout;
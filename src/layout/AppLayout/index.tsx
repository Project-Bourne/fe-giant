import React from 'react'
import "./style.css"
import { Header, NavBar } from '@/components/layouts';

function AppLayout({children}) {

    return (
        <div className='bg-white w-full h-[100vh] relative flex flex-row'>
            {/* Nav Bar Component */}
            <NavBar/>

            <div className='bg-white w-[80vw] ml-[20vw] h-full'>
                {/* Layout header */}
                <Header/>

                {/* wrapper childer */}
                <div className='mt-[120px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 
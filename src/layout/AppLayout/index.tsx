import React from 'react'
import "./style.css"
import { Header, NavBar } from '@/components/layouts';

function AppLayout({children}) {

    return (
        <div className='bg-black w-full h-full flex fixed flex-row'>
        {/* Nav Bar Component */}
        <NavBar/>

        <div className='bg-white w-full'>
            {/* Layout header */}
            <Header/>

            {/* wrapper childer */}
            {children}
        </div>
    </div>
    )
}

export default AppLayout; 
import Image from 'next/image'
import React from 'react'
import RightComp from './RightComp'
import LeftComp from './LeftComp'

function Header() {
  return (
    <div className='bg-white w-[80vw] fixed flex flex-row items-center justify-between py-8 px-8 mb-5 z-[20]'>
        {/* Left component */}
        <LeftComp />

        {/* Right component */}
        <RightComp />
    </div>
  )
}


const styles = {
    rowView: "flex flex-row"
}

export default Header
import React from 'react'
import Left from './components/LeftCompt'
import Right from './components/RightCompt'

const index = () => {
  return (
    <div>
      <h1 className='text-black text-2xl pl-10 font-bold'>Welcome Oluanrawaju</h1>

      <div className='flex items-center justify-between w-full gap-[20px] mt-5'>
      <Left />
      <Right/>
      </div>
      
    </div>  )
}

export default index
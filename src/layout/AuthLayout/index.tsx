import React from 'react'
import Image from 'next/image';
import { useWindowWidth } from '@/components/custom-hooks';



function AuthLayout({children, headerText, subText }) {
    const screenWidth = useWindowWidth();

    const bgStyle = { 
        backgroundColor: `url('../../assets/images/user1.jpg')` , 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return (
        <div className='.root'>
            <div className="flex w-full h-[100vh]">
                <div style={screenWidth < 768 ? bgStyle : {}} className="w-full lg:w-[42%] bg-white overflow-y-scroll"> 
                    <div className="bg-white mx-auto w-[85%] md:w-[45%] lg:w-[80%] rounded-md mt-[15px] md:mt-[30px] px-7"> 
                        {/* logo  */}
                        <div className="mx-auto w-[25%]">
                            <Image
                                src={require("../../assets/svg/logo.svg")} 
                                alt="SIRP Logo"
                                width={100}
                                height={93}
                                priority
                            />
                        </div>
                        {/* heading text  */}
                        <h1 className='text-center md:text-left text-3xl md:text-4xl mt-[30px] md:mt-[40px] mb-2 font-semibold text-black'>{ headerText }</h1>
                        {/* sub-text  */}
                        <p className='text-center md:text-left text-[14px] md:text-base font-light'>{ subText }</p>
                        {/* form  */}
                        <div> {children}  </div>
                    </div> 
                </div>
                <div className="hidden lg:block lg:w-[58%] bg-green-500"></div>
            </div>
        </div>
    )
}

export default AuthLayout; 

import { useState } from "react"


function CustomModal({ style, children, openModal }) {
    const [ toggleModal, setToggleModal ] = useState(openModal);

    const handleModalClose = () => setToggleModal(false);

    if(toggleModal){
        return (
            <div className="fixed z-[1020] w-full h-full top-0 left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
                <div className={`${style} grid`}>
                    <div className="flex justify-end text-xl">
                        <button onClick={handleModalClose}> &times; </button>
                    </div>
                    <main>{children}</main>
                </div>
            </div>
        )
    }else{
        return null;
    }
    
}

export default CustomModal;
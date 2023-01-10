import React, {ReactNode} from "react";

interface Props{
    children:ReactNode
}

const ModalContent = ({children}:Props)=>{
    return(
        <div className='modal-contents'>
            <div className='size14'>
                <strong className='b'>Project List</strong>
            </div>
            {children}
        </div>
    )
}

export default ModalContent
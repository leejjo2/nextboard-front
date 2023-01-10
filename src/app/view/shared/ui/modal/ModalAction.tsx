import React, {ReactNode} from "react";

interface Props{
    children:ReactNode
}

const ModalAction = ({children}:Props)=>{
    return (
        <div className='modal-footer'>
            <div className='modal-btns right'>
                {children}
            </div>
        </div>
    )
}

export default ModalAction;
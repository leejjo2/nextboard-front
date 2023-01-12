import React, {ReactNode} from "react";

interface Props{
    children:ReactNode
}

const ModalAction = ({children}:Props)=>{
    return (
        <div className='modal-footer' style={{marginBottom:20}}>
            <div className='modal-btns right'>
                {children}
            </div>
        </div>
    )
}

export default ModalAction;
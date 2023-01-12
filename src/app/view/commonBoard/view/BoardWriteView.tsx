import {observer} from "mobx-react";
import {DraggableModal, ModalAction} from "../../shared/ui/modal";
import {Button} from "@mui/material";
import React, {MouseEvent} from "react";
import ModalContainer from "../../shared/ui/modal/ModalContainer";

interface Props {
    open: boolean,
    onClose: ((e: MouseEvent<HTMLElement>)=>void)&((event:{}, reason: 'backdropClick'|'escapeKeyDown')=>void)
}
const BoardWriteView = observer(((
    {
        open,
        onClose,
    }:Props)=>{
    return (
        <ModalContainer open={open} onClose={onClose} title={'boardList'} >
            <div className='gap'>
                <ModalAction>
                    <Button variant='outlined' size='small' className='light' onClick={onClose}>
                        close
                    </Button>
                </ModalAction>
            </div>
        </ModalContainer>
    )
    }
))
export default BoardWriteView;
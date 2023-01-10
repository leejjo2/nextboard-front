import {observer} from "mobx-react";
import {DraggableModal, ModalAction} from "../../shared/ui/modal";
import {Button} from "@mui/material";
import React, {MouseEvent} from "react";

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
        <DraggableModal open={open} onClose={onClose} title={'boardList'} fluid width={'55vw'} resizable={true}>
            <div className='gap'>
                <ModalAction>
                    <Button variant='outlined' size='small' className='light' onClick={onClose}>
                        close
                    </Button>
                </ModalAction>
            </div>
        </DraggableModal>
    )
    }
))
export default BoardWriteView;
import React from "react";
import {Box, Modal} from "@mui/material";

interface Props {
    open: boolean,
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void,
    title?: string | number,
    children: React.ReactNode;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:"auto",
};
const ModalContainer = ({
   open,
   onClose,
   title,
   children,
}:Props)=>{
    return(
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className='modal-wrap'>
        <Box sx={style}>
            {children}
        </Box>
        </div>
    </Modal>
    )
}
export default ModalContainer;
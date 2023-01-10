import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Draggable from "react-draggable";
import {Fade, Modal} from "@mui/material";

interface Props {
    open: boolean,
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void,
    title?: string | number,
    children: React.ReactNode;
    width?: string | number;
    fluid?: boolean;
    resizable?: boolean;
}

const DraggableModal = (
    {
        open,
        onClose,
        title,
        children,
        width,
        fluid,
        resizable = true,
    }: Props) => {
    const draggableRef = useRef<HTMLDivElement>(null);

    const [isResized, isSetResized] = useState<boolean>(false);
    const [clientXy, setClientXy] = useState<{x:number, y:number}>({x:0, y:0});
    const [windowXy, setWindowXy] = useState<{ x: number, y: number; }>({x: 0, y: 0});

    const modalPositionX = useMemo(()=> clientXy.x?(windowXy.x/2 - clientXy.x/2):0, [windowXy.x]);
    const modalPositionY = useMemo(()=> clientXy.y?(windowXy.y/2 - clientXy.y/2):0, [windowXy.y]);

    const [position, setPosition] = useState<{x:number, y:number}>({x:modalPositionX, y:modalPositionY});

    const getClientXy = useCallback(()=>{
        if(draggableRef.current){
            setClientXy({
                x:draggableRef.current.clientWidth,
                y:draggableRef.current.clientHeight,
            })
        }
    },[isResized])

    const getWindowXy = useCallback(()=>{
        if(draggableRef.current){
            setWindowXy({
                x:window.innerWidth,
                y:window.innerHeight
            })
        }
    },[isResized])

    const initPosition = useCallback(()=>{
        setPosition({
            x: modalPositionX,
            y: modalPositionY,
        });
    }, [modalPositionX,modalPositionY])

    useEffect(()=>{
        getClientXy();
        getWindowXy();
    }, [isResized, draggableRef.current])

    useEffect(()=>{
        initPosition();
    },[modalPositionX, modalPositionY])

    useEffect(()=>{
        window.onresize = () => isSetResized(!isResized);
    },[isResized])

    useEffect(()=>{
        return () =>{
            isSetResized(false);
            setClientXy({x:0, y:0});
            setWindowXy({x:0, y:0});
        }
    },[])

    return (
        <Draggable
            handle=".ui-draggable-handle"
            position={{
                x: position.x < -clientXy.x + 40 ? - clientXy.x + 50: position.x>windowXy.x - 40 ? windowXy.x -50:position.x,
                y: position.y < 0 ? 0 : position.y > windowXy.y -40 ? windowXy.y -50 : position.y,
            }}
            onStop={()=>{
                if (draggableRef.current) {
                    setPosition({
                        x: draggableRef.current.getBoundingClientRect().x,
                        y: draggableRef.current.getBoundingClientRect().y,
                    });
                }
            }}>
            <Modal open={open}
                   onClose={onClose}
                   closeAfterTransition
                   className='modal-outer backdrop-transparent'
                   ref={draggableRef}
                   >
                <div className="ui-draggable"
                    style={{resize: resizable ? 'both' : 'unset', overflow: "auto"}}
                >
                    <Fade in={open}>
                        <div className='modal-wrap' style={{width:width ? width:fluid?'95vw':'800px', maxWidth:'100%'}}>
                            <div className='modal-inner'>
                                <div className='ui-draggable-handle' style={{cursor:'move'}}>
                                    <div className='modal-header'>
                                        <div className='cm-title'>
                                            <div className='tit'>
                                                <strong className='b'>{title}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {children}
                            </div>
                        </div>
                    </Fade>
                </div>
            </Modal>
        </Draggable>
    )
}
export default DraggableModal;

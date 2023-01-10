import {observer, useLocalObservable} from 'mobx-react'
import BoardStateKeeper from "../../state/BoardStateKeeper";
import React, {useEffect, useState} from "react";
import {GridApi} from "ag-grid-community";
import BoardListView from "./view/BoardListView";
import {Button} from "@mui/material";
import BoardWriteView from "./view/BoardWriteView";

interface Props {
    // userId: string,
}

const BoardContainer = observer(
    ({
         // userId: string,
     }: Props) => {
        const boardStateKeeper = useLocalObservable(() => BoardStateKeeper.instance);
        const {boardRdo} = boardStateKeeper;
        const [gridApi, setGridApi] = useState<GridApi | null>(null);

        const findBoardList = async () => {
            await boardStateKeeper.findBoardList();
        }

        useEffect(() => {
            init();
        }, []);

        const init = () => {
            findBoardList();
        };

        const [viewWriteModal, setViewWriteModal] = useState<boolean>(false);
        const onClickWriteBoard = () =>{
            setViewWriteModal(true);
        }

        const onCloseWriteBoard = () =>{
            setViewWriteModal(false);
        }


        return (
            <>
                <div className='layout-between'>
                    <div className='gap'></div>
                    <div className='gap'>
                        <Button variant='outlined' size='small' onClick={onClickWriteBoard}>
                            Write
                        </Button>
                    </div>
                </div>
                <BoardListView boards={boardRdo?.boards} setGridApi={setGridApi}/>

                {
                    viewWriteModal &&
                    <BoardWriteView open={viewWriteModal} onClose={onCloseWriteBoard}/>
                }

            </>
        );
    }
)
export default BoardContainer;
import {observer} from "mobx-react";
import Board from "../../../api/entity/Board";
import {GridApi, GridReadyEvent} from "ag-grid-community";
import React from "react";
import {AgGridReact} from "ag-grid-react";

interface Props {
    boards: Board[] | undefined,
    setGridApi: (gridApi: GridApi | null) => void,
}

const BoardListView = observer(
    ({
         boards,
         setGridApi,
     }: Props) => {

        const columnDefs = [
            {field: 'id',},
            {field: 'boardNo',},
            {field: 'writerId',},
            {field: 'registerTime',},
            {field: 'title',},
            {field: 'content',},
        ]

        return (
            <>
                <div className="ag-theme-alpine" style={{height: 400}}>
                    <AgGridReact
                        onGridReady={(event: GridReadyEvent) => setGridApi(event.api)}
                        rowData={boards}
                        rowHeight={30}
                        headerHeight={54}
                        columnDefs={columnDefs}/>
                </div>
            </>
        )
    }
)

export default BoardListView;
import React from "react";
interface Props{
    rowData: any[] | undefined,
    gridHeight?:number |string;
    gridWidth?: number|string;
    gridMaxHeight?: number|string;
    children: React.ReactNode;
    fullHeight?: boolean;
}

const AgGridContainer= ({
    rowData,
    children,
    gridHeight = '300px',
    gridWidth = '100%',
    gridMaxHeight,
    fullHeight
}:Props)=>{
    return(
        <div className='layout-grid-wrap size11 flex1 sp-mt-20' style={{height: !fullHeight ? 'auto' : '100%'}}>
            <div className='ag-theme-alpine ag-theme-alpine-custom cell-center'
                 style={{
            height: (fullHeight&&gridHeight||fullHeight)
            ? '100%'
            :rowData&&rowData.length>0
            ? gridHeight:'300px',
                 maxHeight:gridMaxHeight
            ?gridMaxHeight
            :'unset',
                 width:gridWidth}
                 }>
                {children}
            </div>
        </div>
    )
};

export default AgGridContainer;
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import React from "react";
import AlbumContainer from "../app/view/album/AlbumContainer";
import Signin from "../app/view/layout/Signin";
import TabMenu from "../app/view/layout/TabMenu";

const routes = () => (
    <BrowserRouter basename={`/`}>

        <TabMenu>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/album" element={<AlbumContainer/>}/>
                <Route path="/login" element={<Signin/>}/>
            </Routes>
        </TabMenu>
    </BrowserRouter>
)

export default routes;
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Board from "./board/Board";
import Home from "./Home";
import React from "react";
import AlbumContainer from "../app/view/album/AlbumContainer";
import Signin from "../app/view/layout/Signin";

const routes = () => (
    <BrowserRouter basename={`/`}>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/board" element={<Board/>}/>
            <Route path="/album" element={<AlbumContainer/>}/>
            <Route path="/login" element={<Signin/>}/>
        </Routes>
    </BrowserRouter>
)

export default routes;
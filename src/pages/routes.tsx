import {BrowserRouter, Route, Routes} from "react-router-dom";
import Board from "./board/Board";
import Home from "./Home";
import React from "react";

const routes = () => (
    <BrowserRouter basename={`/`}>
        <Routes>
            <Route path="/app" element={<Home/>}/>
            <Route path="/app/board" element={<Board/>}/>
        </Routes>
    </BrowserRouter>
)

export default routes;
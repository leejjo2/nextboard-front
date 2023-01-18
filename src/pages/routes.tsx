import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import TabRoutes from "./TabRoutes";
import {AuthContextProvider} from "./AppContext";

const routes = () => (
    <BrowserRouter basename={`/`}>
        <AuthContextProvider>
            <TabRoutes/>
        </AuthContextProvider>
    </BrowserRouter>
)

export default routes;
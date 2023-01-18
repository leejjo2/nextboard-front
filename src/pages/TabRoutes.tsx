import React, {PropsWithChildren, useContext, useState} from "react";
import {AppBar, Tabs, Tab} from "@material-ui/core";
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import {Button} from "@mui/material";
import Home from "../app/view/layout/Home";
import BoardContainer from "../app/view/album/BoardContainer";
import LogInContainer from "../app/view/member/LogInContainer";
import SignUpContainer from "../app/view/member/SignUpContainer";
import AppContext from "./AppContext";
import AccessDeniedView from "../app/view/shared/AccessDeniedView";

const TabRoutes = () => {


    const appCtx = useContext(AppContext);
    const menuIdx = appCtx.menuIdx;

    const [value, setValue] = useState(0);

    const handleChange = (_e: any, newValue: React.SetStateAction<number>) => {
        // setValue(newValue);
        // appCtx.setMenuIdx(newValue);
    };
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleClickLogout = () => {
        alert('로그아웃');
        appCtx.logout();
        navigate("/", {replace: true})
    }


    return (
        <div>
            <AppBar color="inherit" style={{
                backgroundColor: "whitesmoke",
                color: "pink",
                position: "relative",
                top: 0,
                marginBottom: 40
            }}>
                <Button onClick={handleClickLogin}><HomeIcon/> {!appCtx.isLoggedIn && '\u00a0 Log In'}</Button>
                {appCtx.isLoggedIn && <Button onClick={handleClickLogout}>Log out</Button>}
                <Tabs
                    value={menuIdx === 0 ? false : menuIdx}
                    onChange={handleChange}
                    aria-label="Navigation"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Home" value={1} component={Link} to={"/"}/>
                    <Tab label="Board" value={2} component={Link} to={"/board"}/>
                </Tabs>
            </AppBar>
            <main>
                <Routes>
                    <Route path="/"
                           element={<Home/>}/>
                    <Route path="/board"
                           element={!appCtx.isLoggedIn ? <Navigate to={'/accessDenied'}/> : <BoardContainer/>}/>
                    <Route path="/login"
                           element={appCtx.isLoggedIn ? <Navigate to={'/'}/> : <LogInContainer/>}/>
                    <Route path="/signup"
                           element={appCtx.isLoggedIn ? <Navigate to={'/'}/> : <SignUpContainer/>}/>
                    <Route path="/accessDenied"
                           element={<AccessDeniedView/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default TabRoutes;
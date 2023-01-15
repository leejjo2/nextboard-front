import React, {PropsWithChildren, useState} from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import {Button} from "@mui/material";

const TabMenu = ({children}:PropsWithChildren) => {
    const [value, setValue] = useState(0);

    const handleChange = (_e: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };
    const navigate = useNavigate();

    const handleClicklogin= () =>{
        navigate('/login');
        setValue(-1);
    }


    return (
        <div>
        <AppBar color="inherit" style={{ backgroundColor:"whitesmoke",color:"pink",position: "relative", top: 0, marginBottom:40 }}>
            <Button onClick={handleClicklogin}><HomeIcon /> </Button>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Navigation"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Home" value={0} component={Link} to={"/"} />
                <Tab label="Album" value={1} component={Link} to={"/album"} />
            </Tabs>
        </AppBar>
            <main>
                {children}
            </main>
        </div>
    );
};

export default TabMenu;
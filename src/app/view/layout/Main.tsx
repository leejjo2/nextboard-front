import {makeStyles} from "@material-ui/core/styles";
import React, { useState } from "react";
import {AppBar, CssBaseline, Drawer, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import SidebarList from "../commonBoard/components/SidebarList";
import clsx from "clsx";

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbarButtons: {
        marginLeft: "auto",
        marginRight: -12
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    linked: {
        textDecoration: 'none',
        color: 'white',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Main(props: { data: any; }) {
    const MainContents = props.data;
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(true);

    function handleDrawerOpen() {
        setOpen(true);
    }
    function handleDrawerClose() {
        setOpen(false);
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={open===true ? ()=>handleDrawerClose() : ()=>handleDrawerOpen()}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap>
                        <Link to="/" className={classes.linked}>React JS + Material UI Templates</Link>
                    </Typography>
                    <IconButton
                        className={classes.toolbarButtons}
                        color="inherit"
                        aria-label="Back to home"
                        onClick={()=>(window.location="/")}>
                        <HomeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <SidebarList />

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                {MainContents()}

            </main>
        </div>
    );
}

//From https://medium.com/@ali.atwa/getting-started-with-material-ui-for-react-59c82d9ffd93
import React, {useState} from 'react';
// import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import {getState} from "expect/build/jestMatchersObject";
import {useNavigate} from "react-router-dom";

const styles = (theme: { palette: { background: { paper: any; }; }; spacing: (arg0: number) => any; }) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    selectedItem: {
        background: "blue"
    }
});
const getItems = () => {
    var json = {
        "list": [{
            "id": 1,
            "title": "Templates",
            "items": [{
                "id": 2,
                "name": "게시판",
                "subitems": [{
                    "id": 3,
                    "name": "Sign-In",
                    "url": 'login'
                },
                    {
                        "id": 4,
                        "name": "Album",
                        "url": 'album'
                    },
                    {
                        "id": 5,
                        "name": "Checkout",
                        "url": 'checkout'
                    },
                    {
                        "id": 6,
                        "name": "게시판",
                        "url": 'board'
                    }]
            },
                {
                    "id": 6,
                    "name": "Page Layouts",
                    "subitems": [{
                        "id": 7,
                        "name": "Mini Drawer",
                        "url": 'minidrawer'
                    },
                        {
                            "id": 8,
                            "name": "Nav Tabs",
                            "url": 'navtabs'
                        }]
                }
            ]
        }
        ]
    };
    return json;
}
//const [selectedIndex, setSelectedIndex] = React.useState(1);


const SidebarList = (props: { classes: any; }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState<{2:boolean, 6:boolean}>({2: false, 6: false});
    const handleClick = (e: number) => {
        setOpen({...open, [e]: !open[e as keyof unknown]});
    };
    const handleClickLink = (url: string) => {
        navigate('/'+url);
    }
    const items = getItems();
    const {classes} = props
    return (
        <div>
            {items.list.map((list) => {
                return (
                    <List className={classes.root} key={list.id}>
                        {list.items.map((item, idx) => {
                            return (
                                <div key={item.id}>
                                    {
                                        item.subitems != null ? (
                                            <div key={item.id}>
                                                <ListItem button key={item.id} onClick={() => handleClick(item.id)}>
                                                    <ListItemText primary={item.name}/>
                                                    {open[item.id as unknown as keyof Object ] ? <ExpandLess/> : <ExpandMore/>}
                                                </ListItem>
                                                <Collapse key={item.id} component="li" in={open[item.id as keyof unknown] }
                                                          timeout="auto" unmountOnExit>
                                                    <List disablePadding>
                                                        {item.subitems.map((sitem) => {
                                                            return (
                                                                <ListItem
                                                                    // selected={sitem.url === props.location.pathname ? true : false}
                                                                    button key={sitem.id} className={classes.nested}
                                                                    onClick={() => handleClickLink(sitem.url)}>
                                                                    <ListItemText key={sitem.id} primary={sitem.name}/>
                                                                </ListItem>
                                                            )
                                                        })}
                                                    </List>
                                                </Collapse>
                                            </div>
                                        ) : (
                                            <ListItem
                                                button onClick={() => handleClickLink('')} key={item.id}>
                                                <ListItemText primary={item.name}/>
                                            </ListItem>
                                        )
                                    }
                                </div>

                            )
                        })}
                        <Divider key={list.id} absolute/>
                    </List>
                )
            })}
        </div>
    );
}
SidebarList.propTypes = {
    classes: PropTypes.object.isRequired,
};
// export default withRouter(withStyles(styles)(SidebarList));
export default withStyles(styles)(SidebarList);
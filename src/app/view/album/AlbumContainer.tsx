import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {observer, useLocalObservable} from "mobx-react";
import BoardStateKeeper from "../../state/BoardStateKeeper";
import {GridApi} from "ag-grid-community";
import BoardWriteView from "../commonBoard/view/BoardWriteView";
import AlbumWriteView from "./view/AlbumWriteView";
import Board from '../../api/entity/Board';

const MadeWithLove = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI
            </Link>
            {' team.'}
        </Typography>
    );
}
const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    toolbarButtons: {
        marginLeft: "auto",
        marginRight: -12
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Props {
    // userId: string,
}

const AlbumContainer = observer(({
                                     // userId: string,
                                 }: Props) => {
        const classes = useStyles();

        const boardStateKeeper = useLocalObservable(() => BoardStateKeeper.instance);
        const {boardRdo} = boardStateKeeper;
        const [gridApi, setGridApi] = useState<GridApi | null>(null);

        const findBoardList = async () => {
            await boardStateKeeper.findBoardList();
        }

        useEffect(() => {
            init();
        }, [boardRdo]);

        const init = () => {
            findBoardList();
        };

        const [viewWriteModal, setViewWriteModal] = useState<boolean>(false);
        const onClickWriteBoard = () => {
            setViewWriteModal(true);
        }

        const onCloseWriteBoard = () => {
            setViewWriteModal(false);
        }


        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className={classes.icon}/>
                        <Typography variant="h6" color="inherit" noWrap>
                            Album layout
                        </Typography>
                        <IconButton
                            className={classes.toolbarButtons}
                            color="inherit"
                            aria-label="Back to home"
                            onClick={() => (window.location.href = "/")}>
                            <HomeIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                앨범
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                앨범 게시판 입니다.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={onClickWriteBoard}>
                                            업로드 하기
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Secondary action
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {boardRdo?.boards.map(board => (
                                <Grid item key={board.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {board.title}
                                            </Typography>
                                            <Typography gutterBottom>
                                                {board.content}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                작성자 | {board.writerId}
                                                <br/>
                                                작성시간 | {board.registerTime}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary">
                                                Edit
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                    <MadeWithLove/>
                </footer>
                {/* End footer */}
                {
                    viewWriteModal &&
                    <AlbumWriteView open={viewWriteModal} onClose={onCloseWriteBoard} setViewWriteModal={setViewWriteModal}/>
                }
            </React.Fragment>
        );
    }
);
export default AlbumContainer;
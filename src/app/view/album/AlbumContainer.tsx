import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {observer, useLocalObservable} from "mobx-react";
import BoardStateKeeper from "../../state/BoardStateKeeper";
import {GridApi} from "ag-grid-community";
import AlbumWriteView from "./view/AlbumWriteView";
import Board from '../../api/entity/Board';

interface BoardValues {
    boardNo: string,
    writerId: string,
    title: string,
    content: string,
    photo: string,
}

interface Props {
    // userId: string,
}

const AlbumContainer = observer(({
                                     // userId: string,
                                 }: Props) => {

        const boardStateKeeper = useLocalObservable(() => BoardStateKeeper.instance);
        const {boardRdo} = boardStateKeeper;
        const [gridApi, setGridApi] = useState<GridApi | null>(null);

        const findBoardList = async () => {
            await boardStateKeeper.findBoardList();
        }

        useEffect(() => {
            init();
        }, []);

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

        const [boardValues, setBoardValues] = useState<BoardValues>({
            boardNo: '', writerId: '', content: '', title: '', photo: '',
        })

        const onChangeBoardInput = (e: any) => {
            const {name, value} = e.target;
            setBoardValues({
                ...boardValues,
                [name]: value,
            });
        };

        const handleOnChangeFile = () => {

        }
        const handleClickSave = () => {
            const board = Board.new();
            board.boardNo = boardValues.boardNo;
            board.writerId = boardValues.writerId;
            board.title = boardValues.title;
            board.content = boardValues.content;
            boardStateKeeper.saveBoard(board).then(() => {
                findBoardList();
                setViewWriteModal(false);
            });
        };


        return (
            <React.Fragment>
                <CssBaseline/>
                <main>
                    {/* Hero unit */}
                    <div >
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                앨범
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                앨범 게시판 입니다.
                            </Typography>
                            <div >
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
                    <Container  maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {boardRdo?.boards.map(board => (
                                <Grid item key={board.id} xs={12} sm={6} md={4}>
                                    <Card >
                                        <CardMedia

                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent >
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
                <footer >
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </footer>
                {/* End footer */}
                {
                    viewWriteModal &&
                    <AlbumWriteView open={viewWriteModal} onClose={onCloseWriteBoard}
                                    onChangeBoardInput={onChangeBoardInput} handleOnChangeFile={handleOnChangeFile} handleClickSave={handleClickSave}/>
                }
            </React.Fragment>
        );
    }
);
export default AlbumContainer;
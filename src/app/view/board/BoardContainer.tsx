import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {observer, useLocalObservable} from "mobx-react";
import BoardStateKeeper from "../../state/board/BoardStateKeeper";
import BoardWriteModalView from "./view/BoardWriteModalView";
import Board from '../../api/entity/board/Board';
import AppContext from "../../../pages/AppContext";
import {useNavigate} from "react-router-dom";
import SelectedBoardModalView from "./view/SelectedBoardModalView";
import {CardActionArea} from "@material-ui/core";
import BoardEditModalView from "./view/BoardEditModalView";
import BoardReplyStateKeeper from "../../state/boardReply/BoardReplyStateKeeper";
import BoardReply from "../../api/entity/boardReply/BoardReply";

export interface BoardValues {
    title: string,
    content: string,
}

export interface BoardReplyValues {
    replyContent: string,
}

interface Props {
    // userId: string,
}

const BoardContainer = () => {

    const appCtx = useContext(AppContext);
    const navigate = useNavigate();
    const memberObj = appCtx.memberObj;
    const boardStateKeeper = useLocalObservable(() => BoardStateKeeper.instance);
    const {boardRdo} = boardStateKeeper;
    const boardReplyStateKeeper = useLocalObservable(() => BoardReplyStateKeeper.instance)
    const {boardReplyRdo} = boardReplyStateKeeper;
    const token = appCtx.token;

    const findBoardList = async () => {
        await boardStateKeeper.findBoardList();
    }

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        appCtx.getMember();
        appCtx.setMenuIdx(2);
        findBoardList();
    };

    // Write BoardReply
    const [viewWriteModal, setViewWriteModal] = useState<boolean>(false);
    const onClickWriteBoard = () => {
        setViewWriteModal(true);
    }

    const onCloseWriteBoard = () => {
        setViewWriteModal(false);
    }

    const handleClickSave = (boardValues: BoardValues, file: File) => {
        const board = Board.new();
        board.title = boardValues.title;
        board.content = boardValues.content;
        boardStateKeeper.saveBoard(board, file, token).then(() => {
            findBoardList();
            setViewWriteModal(false);
        });
    };


    // Edit BoardReply
    const [editTargetBoard, setEditTargetBoard] = useState<Board | undefined>(undefined);

    const [viewEditModal, setViewEditModal] = useState<boolean>(false);

    const onClickEditBoard = (boardId: string) => {
        boardStateKeeper.findBoard(boardId, token).then((res) => {
            setEditTargetBoard(res);
        })
        setViewSelectedBoardModal(false)
        setViewEditModal(true);
    }

    const onCloseEditBoard = () => {
        setViewEditModal(false);
        setEditTargetBoard(undefined);
    }

    const handleClickEditComplete = (boardId: string, boardValues: BoardValues, file: File | undefined) => {
        const board = Board.new();
        board.id = boardId;
        board.title = boardValues.title;
        board.content = boardValues.content;
        boardStateKeeper.editBoard(board, file, token).then(() => {
            findBoardList();
            setEditTargetBoard(undefined);
            setViewEditModal(false);
        });
    };


    // Select BoardReply
    const [selectedBoard, setSelectedBoard] = useState<Board | undefined>(undefined);
    const [viewSelectedBoardModal, setViewSelectedBoardModal] = useState<boolean>(false);
    const onClickSelectedBoard = (boardId: string) => {
        boardStateKeeper.findBoard(boardId, token).then((res) => {
            setSelectedBoard(res);
        })
        boardReplyStateKeeper.findBoardReplyList(boardId, token).then((res) => {
        })
        setViewSelectedBoardModal(true);
    }

    const onCloseSelectedBoard = () => {
        setViewSelectedBoardModal(false);
        setSelectedBoard(undefined);
    }

    const onClickDeleteBoard = (boardId: string) => {
        if (viewSelectedBoardModal) {
            setViewSelectedBoardModal(false);
        }
        boardStateKeeper.deleteBoard(boardId, token).then(() => {
                findBoardList();
            }
        );
    }

    const handleClickSend = (boardReplyValues: BoardReplyValues, boardId:string) => {
        // const board = Board.new();
        const boardReply = BoardReply.new();
        boardReply.content = boardReplyValues.replyContent;
        boardReply.boardId = boardId;
        // board.title = boardValues.title;
        // board.content = boardValues.content;
        boardReplyStateKeeper.saveBoardReply(boardReply, token).then(() => {
            boardReplyStateKeeper.findBoardReplyList(boardId, token).then((res) => {
            })
        });
    };


    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                {/* Hero unit */}
                <div>
                    <Container maxWidth="sm">
                        {/*<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>*/}
                        {/*    게시판*/}
                        {/*</Typography>*/}
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            게시판 입니다.
                        </Typography>
                        <div>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={onClickWriteBoard}>
                                        업로드 하기
                                    </Button>
                                </Grid>
                                {/*<Grid item>*/}
                                {/*    <Button variant="outlined" color="primary">*/}
                                {/*        Secondary action*/}
                                {/*    </Button>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {boardRdo?.boards.map(board => (
                            <Grid item key={board.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea onClick={() => onClickSelectedBoard(board.id)}>
                                        <CardMedia
                                            component="img"
                                            src={'/api/board/show-img/' + board.saveFileName}
                                            title="Image title"
                                            style={{height: 140}}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary">
                                                No. {board.boardNo}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {board.title}
                                            </Typography>
                                            <Typography gutterBottom>
                                                {board.content}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                작성자 | {board.writerName}
                                                <br/>
                                                작성시간 | {board.registerTime}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {/*{*/}
                                    {/*    board.writerId === memberObj.memberId*/}
                                    {/*    &&*/}
                                    {/*    <CardActions>*/}
                                    {/*        <Button size="small" color="primary"*/}
                                    {/*                onClick={() => onClickEditBoard(board.id)}>*/}
                                    {/*            Edit*/}
                                    {/*        </Button>*/}
                                    {/*        <Button size="small" color="primary"*/}
                                    {/*                onClick={() => onClickDeleteBoard(board.id)}>*/}
                                    {/*            Delete*/}
                                    {/*        </Button>*/}
                                    {/*    </CardActions>*/}
                                    {/*}*/}


                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer>
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
                <BoardWriteModalView open={viewWriteModal} onClose={onCloseWriteBoard}
                                     handleClickSave={handleClickSave}/>
            }
            {
                viewEditModal &&
                <BoardEditModalView open={viewEditModal} onClose={onCloseEditBoard}
                                    editTargetBoard={editTargetBoard}
                                    handleClickEditComplete={handleClickEditComplete}/>
            }
            {
                viewSelectedBoardModal &&
                <SelectedBoardModalView open={viewSelectedBoardModal} onClose={onCloseSelectedBoard}
                                        selectedBoard={selectedBoard} onClickEditBoard={onClickEditBoard}
                                        onClickDeleteBoard={onClickDeleteBoard} boardReplyList={boardReplyRdo?.boardReplyList}
                                        handleClickSend={handleClickSend}

                />

            }
        </React.Fragment>
    );
}

export default observer(BoardContainer);
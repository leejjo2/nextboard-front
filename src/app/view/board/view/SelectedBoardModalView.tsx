import {ModalAction} from "../../shared/ui/modal";
import {Button} from "@mui/material";
import React, {MouseEvent, useContext} from "react";
import ModalContainer from "../../shared/ui/modal/ModalContainer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Board from "../../../api/entity/board/Board";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import AppContext from "../../../../pages/AppContext";
import BoardReply from "../../../api/entity/boardReply/BoardReply";


const theme = createTheme();

interface Props {
    open: boolean,
    onClose: ((e: MouseEvent<HTMLElement>) => void) & ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    selectedBoard: Board | undefined,
    onClickEditBoard: (boardId: string) => void,
    onClickDeleteBoard: (boardId: string) => void,
    boardReplyList: BoardReply[] | undefined,
}

const SelectedBoardModalView = (
    {
        open,
        onClose,
        selectedBoard,
        onClickEditBoard,
        onClickDeleteBoard,
        boardReplyList,
    }: Props) => {



    const appCtx = useContext(AppContext);
    const memberObj = appCtx.memberObj;

    return (
        <ModalContainer open={open} onClose={onClose} title={'boardList'}>
            <div className='gap'>
                <ModalAction>
                    <Button variant='contained' size='small' className='light' onClick={onClose}>
                        close
                    </Button>
                </ModalAction>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>

                    <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                        {
                            selectedBoard &&
                            <Card>
                                <>
                                    <CardMedia
                                        component="img"
                                        src={'/api/board/show-img/' + selectedBoard.saveFileName}
                                        title="Image title"
                                        style={{height: 140}}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary">
                                            No. {selectedBoard.boardNo}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {selectedBoard.title}
                                        </Typography>
                                        <Typography gutterBottom>
                                            {selectedBoard.content}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            작성자 | {selectedBoard.writerName}
                                            <br/>
                                            작성시간 | {selectedBoard.registerTime}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {
                                            selectedBoard.writerId === memberObj.memberId
                                            &&
                                            <>
                                                <Button size="small" color="primary"
                                                        onClick={() => onClickEditBoard(selectedBoard.id)}>
                                                    Edit
                                                </Button>
                                                <Button size="small" color="primary"
                                                        onClick={() => onClickDeleteBoard(selectedBoard.id)}>
                                                    Delete
                                                </Button>
                                            </>
                                        }

                                    </CardActions>

                                    <CardContent>
                                        <TextField id={"replyContent"} size={"small"} label={"Reply"}
                                                   name={"replyContent"}/>
                                        <Button size="small" color="primary"
                                                onClick={() => onClickEditBoard(selectedBoard.id)}>
                                            send
                                        </Button>
                                    </CardContent>

                                    {
                                        boardReplyList?.map((boardReply, index) => (
                                            <CardContent>
                                                <Typography>
                                                    test : {boardReply.content}
                                                </Typography>
                                            </CardContent>
                                        ))
                                    }

                                </>
                            </Card>
                        }

                    </Container>
                </ThemeProvider>
            </div>
        </ModalContainer>
    );
}

export default SelectedBoardModalView;
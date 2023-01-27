import {observer, useLocalObservable} from "mobx-react";
import {ModalAction} from "../../shared/ui/modal";
import {Box, Button, StepIcon} from "@mui/material";
import React, {MouseEvent, useContext, useState} from "react";
import ModalContainer from "../../shared/ui/modal/ModalContainer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import BoardStateKeeper from "../../../state/board/BoardStateKeeper";
import Board from "../../../api/entity/board/Board";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuIcon from "@material-ui/icons/Menu";
import {FileDownload} from "@mui/icons-material";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import AppContext from "../../../../pages/AppContext";
import {useNavigate} from "react-router-dom";


const theme = createTheme();

interface Props {
    open: boolean,
    onClose: ((e: MouseEvent<HTMLElement>) => void) & ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    selectedBoard: Board | undefined,
    onClickEditBoard:(boardId: string)=>void,
    onClickDeleteBoard: (boardId: string) => void,
}

const SelectedBoardModalView = observer(((
        {
            open,
            onClose,
            selectedBoard,
            onClickEditBoard,
            onClickDeleteBoard,
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
                                                <Button size="small" color="primary" onClick={()=> onClickEditBoard(selectedBoard.id)}>
                                                    Edit
                                                </Button>
                                                <Button size="small" color="primary"
                                                        onClick={() => onClickDeleteBoard(selectedBoard.id)}>
                                                    Delete
                                                </Button>
                                            </>
                                        }

                                    </CardActions>
                                </Card>
                            }

                        </Container>
                    </ThemeProvider>
                </div>
            </ModalContainer>
        );
    }
))
export default SelectedBoardModalView;
import {observer, useLocalObservable} from "mobx-react";
import {ModalAction} from "../../shared/ui/modal";
import {Box, Button, StepIcon} from "@mui/material";
import React, {MouseEvent, useState} from "react";
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
import BoardStateKeeper from "../../../state/BoardStateKeeper";
import Board from "../../../api/entity/Board";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuIcon from "@material-ui/icons/Menu";
import {FileDownload} from "@mui/icons-material";

interface BoardValues {
    boardNo: string,
    writerId: string,
    title: string,
    content: string,
}

const theme = createTheme();

interface Props {
    open: boolean,
    onClose: ((e: MouseEvent<HTMLElement>) => void) & ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    onChangeBoardInput:(e:any)=>void,
    handleOnChangeFile:any,
    handleClickSave: any
}

const AlbumWriteView = observer(((
        {
            open,
            onClose,
            onChangeBoardInput,
            handleOnChangeFile,
            handleClickSave,
        }: Props) => {

        const onClickSave = () => {
            handleClickSave();
        }

        // const onChangeFile = (e) => {
        //     console.log(e.target.files[0]);
        //     handleOnChangeFile(e.target.files[0])
        // }

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
                        <AppBar
                            position="absolute"
                            color="default"
                            elevation={0}
                            sx={{
                                position: 'relative',
                                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                            }}
                        >
                            <Toolbar>
                                <Typography variant="h6" color="inherit" noWrap>
                                    앨범 게시판
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                                <Typography component="h1" variant="h4" align="center">
                                    게시물 작성
                                </Typography>

                                <React.Fragment>
                                    <React.Fragment>
                                        <Typography variant="h6" gutterBottom>
                                            글을 작성해 주세요.
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="boardNo"
                                                    name="boardNo"
                                                    label="Board No"
                                                    onChange={onChangeBoardInput}
                                                    fullWidth
                                                    autoComplete="given-name"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="writerId"
                                                    name="writerId"
                                                    label="Writer Id"
                                                    onChange={onChangeBoardInput}
                                                    fullWidth
                                                    autoComplete="family-name"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    id="title"
                                                    name="title"
                                                    label="Title"
                                                    onChange={onChangeBoardInput}
                                                    fullWidth
                                                    autoComplete="shipping address-line1"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="content"
                                                    name="content"
                                                    label="Content"
                                                    onChange={onChangeBoardInput}
                                                    fullWidth
                                                    autoComplete="shipping address-line2"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <input
                                                    color="primary"
                                                    accept="image/*"
                                                    type="file"
                                                    // onChange={onChangeFile}
                                                    id="icon-button-file"
                                                    style={{ display: 'none', }}
                                                />
                                                <label htmlFor="icon-button-file">
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        size="large"
                                                        color="primary"
                                                    >
                                                        <FileDownload></FileDownload>
                                                    </Button>
                                                </label>
                                            </Grid>

                                        </Grid>
                                    </React.Fragment>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                        <Button
                                            variant="contained"
                                            onClick={onClickSave}
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {'저장'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </div>
            </ModalContainer>
        )
    }
))
export default AlbumWriteView;
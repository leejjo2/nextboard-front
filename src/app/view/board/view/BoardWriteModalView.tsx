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
import {BoardValues} from "../BoardContainer";


const theme = createTheme();

interface Props {
    open: boolean,
    onClose: ((e: MouseEvent<HTMLElement>) => void) & ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    handleClickSave: any
}

const BoardWriteModalView = (
        {
            open,
            onClose,
            handleClickSave,
        }: Props) => {


        const [boardValues, setBoardValues] = useState<BoardValues>({
             content: '', title: ''
        })

        const onChangeBoardInput = (e: any) => {
            const {name, value} = e.target;
            setBoardValues({
                ...boardValues,
                [name]: value,
            });
        };

        const [file, setFile] = useState<File | undefined>(undefined);
        const [previewImg, setPreviewImg] = useState<string|ArrayBuffer|null>("");
        const onChangeFile = (e:React.ChangeEvent<HTMLInputElement>) => {
            if (!e) {
                return;
            } else {
                setFile(e.target.files![0])
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files![0]);
                reader.onloadend = () =>{
                    setPreviewImg(reader.result);
                }
                e.target.value = '';
            }
        }

        const onClickSave = () => {
            if(file){
            handleClickSave(boardValues, file);
            setFile(undefined);
            }else{
                alert('???????????? ????????? ?????????.')
            }
        }

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
                                    ?????????
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                                <Typography component="h1" variant="h4" align="center" sx={{mb: 4}}>
                                    ????????? ??????
                                </Typography>

                                <React.Fragment>
                                    <React.Fragment>
                                        {/*<Typography variant="h6" gutterBottom>*/}
                                        {/*    ?????? ????????? ?????????.*/}
                                        {/*</Typography>*/}
                                        <Grid container spacing={3}>
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
                                                    rows={5}
                                                    multiline
                                                    onChange={onChangeBoardInput}
                                                    fullWidth
                                                    autoComplete="shipping address-line2"
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <input
                                                    color="primary"
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={onChangeFile}
                                                    id="icon-button-file"
                                                    style={{display: 'none',}}
                                                />
                                                <label htmlFor="icon-button-file">
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        size="large"
                                                        color="primary"
                                                    >
                                                        {/*<FileDownload></FileDownload>*/}
                                                        ?????? ?????????
                                                    </Button>
                                                </label>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <img
                                                    style={{width:200, height:200}}
                                                    src={previewImg? previewImg.toString():''}
                                                />
                                            </Grid>

                                        </Grid>
                                    </React.Fragment>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                        <Button
                                            variant="contained"
                                            onClick={onClickSave}
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {'??????'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </div>
            </ModalContainer>
        );
    };
export default BoardWriteModalView;
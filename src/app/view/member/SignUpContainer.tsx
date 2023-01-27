import React, {useContext, useEffect, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Board from "../../api/entity/board/Board";
import User from "../../api/entity/member/Member";
import {observer, useLocalObservable} from "mobx-react";
import BoardStateKeeper from "../../state/board/BoardStateKeeper";
import MemberStateKeeper from "../../state/member/MemberStateKeeper";
import {useNavigate} from "react-router-dom";
import AppContext from "../../../pages/AppContext";


export interface MemberValues {
    memberId: string,
    memberPassword: string,
    memberName: string,
}


interface Props {
    // userId: string,
}

const SignUpContainer = observer(({
                             // userId: string,
                         }: Props) => {

        const appCtx = useContext(AppContext);
        const navigate = useNavigate();
        const userStateKeeper = useLocalObservable(() => MemberStateKeeper.instance);

        const [memberValues, setMemberValues] = useState<MemberValues>({
            memberId: '', memberName: '', memberPassword: ''
        })

        useEffect(() => {
            init();
        }, []);

        const init = () => {
            appCtx.setMenuIdx(0);
        };

        const onChangeBoardInput = (e: any) => {
            const {name, value} = e.target;
            setMemberValues({
                ...memberValues,
                [name]: value,
            });
        };
        const handleClickSave = async (event:React.FormEvent) => {
            event.preventDefault();
            if (memberValues.memberPassword === "" || memberValues.memberId === "" || memberValues.memberName === "") {
                alert("input values");

            } else {
                appCtx.signup(memberValues.memberId, memberValues.memberPassword, memberValues.memberName);
                navigate('/login');
            }
        };

        return (
            <Container component="main" maxWidth="xs" style={{marginTop: 150}}>
                <CssBaseline/>
                <div>
                    <Typography component="h1" variant="h5" style={{textAlign: "center"}}>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={handleClickSave}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="memberId"
                            label="memberId"
                            name="memberId"
                            autoComplete="memberId"
                            onChange={onChangeBoardInput}
                            focused={memberValues.memberId===''}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="memberPassword"
                            label="memberPassword"
                            type="memberPassword"
                            id="memberPassword"
                            autoComplete="memberPassword"
                            focused={memberValues.memberPassword===''}
                            onChange={onChangeBoardInput}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="memberName"
                            label="memberName"
                            type="memberName"
                            id="memberName"
                            autoComplete="memberName"
                            focused={memberValues.memberName===''}
                            onChange={onChangeBoardInput}
                        />
                        <Button
                            type={"submit"}
                            fullWidth
                            variant="contained"
                            color="primary"
                            // onClick={handleClickSave}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
);
export default SignUpContainer;
import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useNavigate} from "react-router-dom";
import { MemberValues } from './SignUpContainer';
import AppContext from "../../../pages/AppContext";


const LogInContainer = () => {

  const navigate = useNavigate();
  const appCtx = useContext(AppContext);
  const toSignUp = () =>{
    navigate('/signup');
  }


  const [isLoading, setIsLoading] = useState(false);

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

  const handleClickSignIn = async () => {
    if (memberValues.memberPassword === "" || memberValues.memberId === "") {
      alert("input values");

    } else {
      setIsLoading(true);
      appCtx.login(memberValues.memberId, memberValues.memberPassword);
      setIsLoading(false);
      if (appCtx.isSuccess) {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:150}}>
      <CssBaseline />
      <div >
        <Avatar style={{margin:"auto"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
          Log in
        </Typography>
        <form  noValidate>
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
            onChange={onChangeBoardInput}
            autoComplete="current-password"
            focused={memberValues.memberPassword===''}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClickSignIn}
          >
            Sign In
            {isLoading && <p>Loading</p>}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={toSignUp} color={"primary"}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LogInContainer;
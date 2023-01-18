import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useNavigate} from "react-router-dom";
import AppContext from "../../../pages/AppContext";


const AccessDeniedView = () => {

  const navigate = useNavigate();
  const appCtx = useContext(AppContext);


  useEffect(() => {
    init();
  }, []);

  const init = () => {
    appCtx.setMenuIdx(0);
  };


  const handleClickGoingToLogin = async () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:150}}>
      <CssBaseline />
      <div >
        <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
          Access denied. {!appCtx.isLoggedIn&& <p>LogIn Required</p>}
        </Typography>
        {
            !appCtx.isLoggedIn&&
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickGoingToLogin}
            >
              Going to Log In
            </Button>
        }

      </div>
    </Container>
  );
}

export default AccessDeniedView;
import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './AuthAction';

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode }
type MemberInfo = { memberId: string, memberName: string};
type LoginToken = {
    grantType: string,
    accessToken: string,
    tokenExpiresIn: number
}

const AppContext = React.createContext({
    menuIdx:0,
    setMenuIdx:(menuIdx:any)=>{},
    token: '',
    memberObj: { memberId: '', memberName: '' },
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    signup: (memberId: string, memberPassword: string, memberName:string) =>  {},
    login: (memberId:string, memberPassword: string) => {},
    logout: () => {},
    getMember: () => {},
    changeNickname: (nickname:string) => {},
    changePassword: (exPassword: string, newPassword: string) => {}
});


export const AuthContextProvider:React.FC<Props> = (props) => {
    const [menuIdx, setMenuIdx] = useState(0);

    const tokenData = authAction.retrieveStoredToken();

    let initialToken:any;
    if (tokenData) {
        initialToken = tokenData.token!;
    }

    const [token, setToken] = useState(initialToken);
    const [memberObj, setMemberObj] = useState({
        memberId: '',
        memberName: ''
    });

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isGetSuccess, setIsGetSuccess ] = useState<boolean>(false);

    const userIsLoggedIn = !!token;



    const signupHandler = (memberId:string, memberPassword: string, memberName: string) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(memberId, memberPassword, memberName);
        response.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
            }
        });
    }

    const loginHandler = (memberId:string, memberPassword: string) => {
        setIsSuccess(false);
        console.log(isSuccess);

        const data = authAction.loginActionHandler(memberId, memberPassword);
        data.then((result) => {
            if (result !== null) {
                const loginData:LoginToken = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(
                    logoutHandler,
                    authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn)
                );
                setIsSuccess(true);
                console.log(isSuccess);
            }
        })
    };

    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const getMemberHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('get user start!');
                const userData:MemberInfo = result.data;
                setMemberObj(userData);
                setIsGetSuccess(true);
            }
        })

    };

    const changeNicknameHandler = (nickname:string) => {
        setIsSuccess(false);

        const data = authAction.changeNicknameActionHandler(nickname, token);
        data.then((result) => {
            if (result !== null) {
                const userData:MemberInfo = result.data;
                setMemberObj(userData);
                setIsSuccess(true);
            }
        })
    };

    const changePaswordHandler = (exPassword:string, newPassword: string) => {
        setIsSuccess(false);
        const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
        data.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
                logoutHandler();
            }
        });
    };

    useEffect(() => {
        if(tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);


    const contextValue = {
        menuIdx,
        setMenuIdx,
        token,
        memberObj: memberObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        getMember: getMemberHandler,
        changeNickname: changeNicknameHandler,
        changePassword: changePaswordHandler
    }

    return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;

import React, {useContext, useEffect} from "react";
import AppContext from "../../../pages/AppContext";

const Home = () =>{

    const appCtx = useContext(AppContext);
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        appCtx.setMenuIdx(1);
    };

    return (
        <>

            <div>
                Home
            </div>
        </>
    )
}


export default Home;
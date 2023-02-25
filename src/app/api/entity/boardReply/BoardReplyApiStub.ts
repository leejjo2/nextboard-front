import BoardReply from "./BoardReply";
import axios, {AxiosResponse, toFormData} from "axios";
import BoardReplyRdo from "./sdo/BoardReplyRdo";
import {useContext} from "react";
import AppContext from "../../../../pages/AppContext";

const createTokenHeader = (token: any) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}
const boardReplyRootUrl = '/api/boardReply'

class BoardReplyApiStub {

    private static _instance: BoardReplyApiStub;


    static get instance() {
        if (!BoardReplyApiStub._instance) {
            BoardReplyApiStub._instance = new BoardReplyApiStub();
        }
        return BoardReplyApiStub._instance;
    }

    async findBoardList(boardId:string, token: any): Promise<BoardReplyRdo> {
        return await axios.post(boardReplyRootUrl + '/find-boardReplyList-byBoardId', {boardId:boardId})
            .then((res) => {
                return res.data
            })
            .catch(error => error);
    }

    async saveBoard(boardReply: BoardReply, token: any) {
        await axios.post(boardReplyRootUrl + '/save-boardReply', createTokenHeader(token))
            .then((res) => {
                console.log(res);
            })
            .catch(error => error);
    }


}

export default BoardReplyApiStub;
import Board from "./Board";
import axios, {AxiosResponse, toFormData} from "axios";
import BoardRdo from "./sdo/BoardRdo";
import {useContext} from "react";
import AppContext from "../../../../pages/AppContext";

const createTokenHeader = (token:any) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}
class BoardApiStub {

    private static _instance: BoardApiStub;



    static get instance() {
        if (!BoardApiStub._instance) {
            BoardApiStub._instance = new BoardApiStub();
        }
        return BoardApiStub._instance;
    }

    async findBoardList() :Promise<BoardRdo>{
        return await axios.post('/api/board/find-all-board-list')
                .then((res) =>{
                  return res.data})
                .catch(error => error);
    }

    async findBoard(boardId:string, token:any) : Promise<Board>{
        return await axios.post('/api/board/find-board', {'id':boardId}, createTokenHeader(token))
            .then((res) =>{
                return res.data})
            .catch(error => error);
    }

    async saveBoard(board:Board, file:File|undefined, token:any){
        const formData = new FormData();
        if(file){
            formData.append("file", file);
        }
        formData.append("board", new Blob([JSON.stringify(board)],{type:"application/json"}));
        await axios.post('/api/board/save-board', formData, createTokenHeader(token))
            .then((res)=>{
                console.log(res);
            })
            .catch(error=>error);
    }
    async editBoard(board:Board, file:File|undefined, token:any){
        const formData = new FormData();
        formData.append("board", new Blob([JSON.stringify(board)],{type:"application/json"}));
        if(file){
            formData.append("file", file);
        }
        await axios.post('/api/board/edit-board', formData, createTokenHeader(token))
            .then((res)=>{
                console.log(res);
            })
            .catch(error=>error);
    }

    async deleteBoard(boardId:string, token:any){
        await axios.post('/api/board/delete-board',{'id':boardId}, createTokenHeader(token) )
    }

}

export default BoardApiStub;
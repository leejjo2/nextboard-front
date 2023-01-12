import Board from "./entity/Board";
import axios, {AxiosResponse} from "axios";
import BoardRdo from "./entity/sdo/BoardRdo";

class BoardSeekApiStub {

    private static _instance: BoardSeekApiStub;

    static get instance() {
        if (!BoardSeekApiStub._instance) {
            BoardSeekApiStub._instance = new BoardSeekApiStub();
        }
        return BoardSeekApiStub._instance;
    }

    async findBoardList() :Promise<BoardRdo>{
        return await axios.post('/api/board/find-all-board-list',)
                .then((res) =>{
                  return res.data})
                .catch(error => error);
    }

    async saveBoard(board:Board){
        await axios.post('/api/board/new', board)
            .then((res)=>{
                console.log(res);
            })
            .catch(error=>error);
    }
}

export default BoardSeekApiStub;
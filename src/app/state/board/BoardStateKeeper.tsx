import {makeAutoObservable, runInAction} from "mobx";
import Board from "../../api/entity/board/Board";
import BoardRdo from "../../api/entity/board/sdo/BoardRdo";
import BoardApiStub from "../../api/entity/board/BoardApiStub";

class BoardStateKeeper {

    private static _instance: BoardStateKeeper;

    private readonly boardApi: BoardApiStub;

    boardRdo: BoardRdo | null | undefined;

    static get instance() {
        if (!BoardStateKeeper._instance) {
            BoardStateKeeper._instance = new BoardStateKeeper();
        }
        return BoardStateKeeper._instance;
    }

    constructor(
        boardSeekApi: BoardApiStub = BoardApiStub.instance,
    ) {
        this.boardApi = boardSeekApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async findBoardList(): Promise<BoardRdo> {
        const boardRdo = await this.boardApi.findBoardList();
        console.log("!!" + boardRdo);
        runInAction(() => this.boardRdo = Object.assign(new BoardRdo(boardRdo.boards)));
        return boardRdo;
    }

    async saveBoard(board:Board, file:File|undefined, token: any) {
        await this.boardApi.saveBoard(board, file, token);
    }

    async deleteBoard(boardId:string, token:any){
        await this.boardApi.deleteBoard(boardId, token);
    }

}

export default BoardStateKeeper;
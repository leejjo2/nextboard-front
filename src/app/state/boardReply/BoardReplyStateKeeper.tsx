import {makeAutoObservable, runInAction} from "mobx";
import BoardReplyApiStub from "../../api/entity/boardReply/BoardReplyApiStub";
import BoardReplyRdo from "../../api/entity/boardReply/sdo/BoardReplyRdo";
import boardReply from "../../api/entity/boardReply/BoardReply";

class BoardReplyStateKeeper {

    private static _instance: BoardReplyStateKeeper;

    private readonly boardReplyApi: BoardReplyApiStub;

    boardReplyRdo: BoardReplyRdo | null | undefined;

    static get instance() {
        if (!BoardReplyStateKeeper._instance) {
            BoardReplyStateKeeper._instance = new BoardReplyStateKeeper();
        }
        return BoardReplyStateKeeper._instance;
    }

    constructor(
        boardSeekApi: BoardReplyApiStub = BoardReplyApiStub.instance,
    ) {
        this.boardReplyApi = boardSeekApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async findBoardReplyList(boardId:string, token:any): Promise<BoardReplyRdo> {
        const boardReplyRdo = await this.boardReplyApi.findBoardList(boardId, token);
        console.log("!!" + boardReplyRdo);
        runInAction(() => this.boardReplyRdo = Object.assign(boardReplyRdo));
        return boardReplyRdo;
    }


    async saveBoardReply(boardReply: boardReply, token: any) {
        await this.boardReplyApi.saveBoard(boardReply, token);
    }


}

export default BoardReplyStateKeeper;
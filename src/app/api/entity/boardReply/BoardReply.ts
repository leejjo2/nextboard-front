class BoardReply {
    id: string;
    replyNo: number;
    boardId: string;
    memberId: string;
    writerName: string;
    depth: number;
    parentId: string;
    registerTime: string;
    modificationTime: string;
    modified: string;
    content: string;


    constructor(id: string, replyNo: number, boardId: string, memberId: string, writerName: string, depth: number, parentId: string, registerTime: string, modificationTime: string, modified: string, content: string) {
        this.id = id;
        this.replyNo = replyNo;
        this.boardId = boardId;
        this.memberId = memberId;
        this.writerName = writerName;
        this.depth = depth;
        this.parentId = parentId;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
        this.modified = modified;
        this.content = content;
    }


    static fromDomain(domain: BoardReply): BoardReply {
        const board = new BoardReply(
            domain.id,
            domain.replyNo,
            domain.boardId,
            domain.memberId,
            domain.writerName,
            domain.depth,
            domain.parentId,
            domain.registerTime,
            domain.modificationTime,
            domain.modified,
            domain.content
        )
        return board;
    }

    static new(): BoardReply {
        return new BoardReply('', 0, '', '', '', 0, '', '', '', '', '');
    }
}

export default BoardReply;

class Board {
    id:string;
    boardNo: string;
    writerId: string;
    writerName: string;
    registerTime: string;
    modificationTime: string;
    title: string;
    content: string;
    filePath:string;
    saveFileName:string;
    originalFileName:string;


    constructor(id: string, boardNo: string, writerId: string,writerName:string, registerTime: string, modificationTime: string, title: string, content: string, filePaht:string, saveFileName:string,originalFileName:string) {
        this.id = id;
        this.boardNo = boardNo;
        this.writerId = writerId;
        this.writerName= writerName;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
        this.title = title;
        this.content = content;
        this.filePath = filePaht;
        this.saveFileName = saveFileName;
        this.originalFileName = originalFileName;
    }

    static fromDomain(domain: Board): Board {
        const board = new Board(
            domain.id,
            domain.boardNo,
            domain.writerId,
            domain.writerName,
            domain.registerTime,
            domain.modificationTime,
            domain.title,
            domain.content,
            domain.filePath,
            domain.saveFileName,
            domain.originalFileName
        )
        return board;
    }

    static new(): Board {
        return new Board('','','', '', '','', '', '', '','','');
    }

}

export default Board;
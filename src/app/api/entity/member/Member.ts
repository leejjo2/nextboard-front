import React from "react";

class Member {
    id:string;
    memberId: string;
    memberPassword: string;
    memberName:string;
    authority:string;
    registerTime: string;
    modificationTime: string;

    constructor(id: string, memberId: string, memberPassword: string, memberName:string, authority:string, registerTime: string, modificationTime: string) {
        this.id = id;
        this.memberId = memberId;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.authority = authority;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
    }

    static fromDomain(domain: Member): Member {
        const board = new Member(
            domain.id,
            domain.memberId,
            domain.memberPassword,
            domain.memberName,
            domain.authority,
            domain.registerTime,
            domain.modificationTime,
        )
        return board;
    }

    static new(): Member {
        return new Member('','', '', '','', '','');
    }

}

export default Member;
import {makeAutoObservable} from "mobx";
import MemberApiStub from "../../api/entity/member/MemberApiStub";
import Member from "../../api/entity/member/Member";

class MemberStateKeeper {

    private static _instance: MemberStateKeeper;

    private readonly memberApi: MemberApiStub;


    static get instance() {
        if (!MemberStateKeeper._instance) {
            MemberStateKeeper._instance = new MemberStateKeeper();
        }
        return MemberStateKeeper._instance;
    }

    constructor(
        memberApi: MemberApiStub = MemberApiStub.instance,
    ) {
        this.memberApi = memberApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }


    async saveMember(member:Member) {
        await this.memberApi.saveMember(member);
    }

}

export default MemberStateKeeper;
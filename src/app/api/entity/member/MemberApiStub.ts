import axios from "axios";
import Member from "./Member";

class MemberApiStub {

    private static _instance: MemberApiStub;

    static get instance() {
        if (!MemberApiStub._instance) {
            MemberApiStub._instance = new MemberApiStub();
        }
        return MemberApiStub._instance;
    }


    async saveMember(member:Member){
        await axios.post('/api/member/save-member', member)
            .then((res)=>{
                console.log(res);
            })
            .catch(error=>error);
    }

}

export default MemberApiStub;
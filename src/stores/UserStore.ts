import { request } from "../utils/request";
import { action, flow, observable } from "mobx";
import { storageSave } from "../utils/storage";
import Loading from "../components/widget/Loading";

class UserStore {
    @observable userInfo: any;


    @action
    setUserInfo = (info: any) => {
        this.userInfo = info
    }


    requestLogin =
        flow(function* (
            this: UserStore,
            phone: string,
            pwd: string,
            callback: (success: boolean) => void) {
            Loading.show()
            try {
                const params = {
                    name: phone,
                    pwd: pwd,
                }
                const { data } = yield request('login', params);
                console.log(data)
                if (data) {
                    storageSave('userInfo', JSON.stringify(data))
                    this.userInfo = data;
                    callback?.(true);
                } else {
                    this.userInfo = null;
                    callback?.(false)
                }

            } catch (e) {
                console.log(e)
                this.userInfo = null;
                callback?.(false)
            } finally {
                Loading.hide()
            }
        })


}

export default new UserStore();

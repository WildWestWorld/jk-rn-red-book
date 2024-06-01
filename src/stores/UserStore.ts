import { request } from "../utils/request";
import { flow } from "mobx";
import { storageSave } from "../utils/storage";

class UserStore {
    userInfo: any;
    requestLogin =
        flow(function* (
            this: UserStore,
            phone: string,
            pwd: string,
            callback: (success: boolean) => void) {
            try {
                const params = {
                    name: phone,
                    pwd: pwd,
                }
                const { data } = yield request('login', params);
                console.log(data)
                if (data) {
                    storageSave('userInfo',JSON.stringify(data))
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
            }
        })


}

export default new UserStore();

import { observable, action } from 'mobx';
import { request } from "../../utils/request";

const SIZE = 10;

export default class HomeStore {
    @observable page = 1;
    @action
    requestHomeList = async () => {
        try {
            const params = {
                page: this.page,
                size: SIZE
            };
            const { data } = await request('homeList', params);
            console.log(`data=${JSON.stringify(data)}`);
        } catch (error) {
            console.log(error);
        }
    }
}
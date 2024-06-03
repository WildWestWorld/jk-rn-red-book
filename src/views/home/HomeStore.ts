import { observable, action } from 'mobx';
import { request } from "../../utils/request";

const SIZE = 10;

export default class HomeStore {
    page: number = 1;
    @observable homeList: ArticleSimple[] = [];
    @observable refreshing: boolean = false;

    @action
    resetPage = () => {
        console.log('触发')
        this.page = 1
    }


    @action
    requestHomeList = async () => {
        if (this.refreshing) {
            return
        }
        try {
            this.refreshing = true;
            const params = {
                page: this.page,
                size: SIZE
            };
            const { data } = await request('homeList', params);
            if (data?.length) {
                if (this.page === 1) {
                    this.homeList = data;
                } else {
                    this.homeList = [...this.homeList, ...data]
                }
                this.page = this.page + 1
            } else {
                if (this.page == 1) {
                    this.homeList = []
                } else {

                }


            }

        } catch (error) {
            console.log(error);
        } finally {
            this.refreshing = false;
        }
    }
}
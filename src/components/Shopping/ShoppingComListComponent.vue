<template>
    <div>
        <ShoppingRequestCardComponent v-for="memberDatas in this.$store.state.startShoppingList" :member-data="memberDatas" :key="memberDatas.user_id"></ShoppingRequestCardComponent>
    </div>
    <div class="clear">
        <button class="button button-red pos-r" @click="this.compShopping">買い物完了</button>
    </div>
</template>

<script>
import ShoppingRequestCardComponent from './ShoppingRequestCardComponent.vue';
import axios from 'axios';

    export default{
        components:{
            ShoppingRequestCardComponent
        },
        data(){
            return{
                r_uidList:[]
            }
        },
        methods:{
            compShopping(){
                this.setRequestList();
                if(this.r_uidList.length == 0){
                    this.$store.commit('goMypage');
                    return false;
                }
                if(window.confirm('買い物を完了してもよろしいですか？\n（買い物完了処理後、マイページへ遷移します。）')){
                    this.$store.commit('debug', "削除処理実行");
                    axios.get(this.$store.state.BASE_URL + "request/comp", {
                        params:{
                            r_uids:this.r_uidList,
                            buy_user_id:this.$store.state.userInfo.id
                        },
                        paramsSerializer: {indexes: null}
                    }).then((res) => {
                        if(res){
                            this.$store.commit('debug', '買い物完了');
                            // this.$store.commit('updateRequestInfo');
                            this.$store.commit('goMypage')
                        }else{
                            console.log('エラー発生');
                        }
                    })
                }else{
                    console.log('削除処理キャンセル');
                }
            },
            setRequestList(){
                this.$store.commit('debug', 'setRequestList()---送信用のリストを作成します。');
                let lis = this.$store.state.startShoppingList;
                if(lis == null || lis.length == 0){
                    return ;
                }
                for(let li of lis){
                    console.log(li)
                    for(let item of li.requests){
                        if(item.inCart && !this.r_uidList.includes(item.request_user_id)){
                            this.r_uidList.push(item.request_user_id);
                        }
                    }

                }
                this.$store.commit('debug', 'setRequestList()---送信用のリスト作成完了。');
            },
        },
        created:function(){
            this.$store.commit('debug','マイページ用リクエストデータ取得開始');
            this.$store.commit('debug','＜パラメータ情報＞');
            this.$store.commit('debug','user_id:' + this.$store.state.userInfo.id);
            this.$store.commit('debug','＜ここまで＞');
            this.$store.commit('getStartShoppingList');
            this.$store.commit('debug','マイページ用リクエストデータ取得終了')
            this.$store.commit('debug','取得した情報ーーーーーーーーーーーーーー');
            this.$store.commit('debug', this.$store.state.startShoppingList);
        }
    }
</script>

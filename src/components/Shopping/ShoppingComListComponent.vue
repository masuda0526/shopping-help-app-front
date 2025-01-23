<template>
    <div>
        <ShoppingRequestCardComponent v-for="memberDatas in this.$store.state.communityRequest" :member-data="memberDatas" :key="memberDatas.user_id"></ShoppingRequestCardComponent>
    </div>
    <div class="clear">
        <button class="button button-red pos-r" @click="this.$store.commit('goMypage')">前の画面へ</button>
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
                
            }
        },
        methods:{
            compShopping(){
                if(window.confirm('買い物を完了させますか？\n（カートに入っている商品をリストから削除します。）')){
                    this.$store.commit('debug', "削除処理実行");
                    axios.get(this.$store.state.BASE_URL + "request/comp", {
                        params:{
                            buy_user_id:this.$store.state.userInfo.id
                        }
                    }).then((res) => {
                        if(res){
                            this.$store.commit('debug', '買い物完了');
                            // this.$store.commit('updateRequestInfo');
                        }else{
                            console.log('エラー発生');
                        }
                    })
                }else{
                    console.log('削除処理キャンセル');
                }
            }
        },
        created:function(){
            this.$store.commit('debug','マイページ用リクエストデータ取得開始');
            this.$store.commit('debug','＜パラメータ情報＞');
            this.$store.commit('debug','user_id:' + this.$store.state.userInfo.id);
            this.$store.commit('debug','＜ここまで＞');
            this.$store.commit('getRequestInfoForMypage');
            this.$store.commit('debug','マイページ用リクエストデータ取得終了')
            this.$store.commit('debug','取得した情報ーーーーーーーーーーーーーー');
            this.$store.commit('debug', this.$store.state.communityRequest);
        }
    }
</script>

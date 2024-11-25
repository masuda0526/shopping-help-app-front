<template>
    <h2 class="mb-l">買い物リスト</h2>
    <div class="request-list pd-m pstrl" v-if="this.$store.state.isLogin">
        <button @click="changeList" class="change-btn pstab"><fa icon="rotate" />{{ showListName }}リスト表示中</button>
        <div>
            <table class="request-table">
                <tr>
                    <th>商品名</th>
                    <th>登録日</th>
                    <th>登録者</th>
                    <th>購入状況</th>
                </tr>
                <RequestItem v-for="item in returnShowList" :key="item.id" :item="item"/>
            </table>
            <button @click="compShopping">買い物を完了する</button>
        </div>
        <NewRequest/>
    </div>
    <div v-else>
        <p>購入リストを表示するにはログインが必要です</p>
    </div>
</template>

<script>
    import NewRequest from './NewRequest.vue';
import RequestItem from './RequestItem.vue';
import axios from 'axios';
    export default{
        name:'RequestList',
        components:{
            RequestItem,
            NewRequest
        },
        data(){
            return{
                showMyListFlg:true,
                // cartList:[]
            }
        },
        methods:{
            changeList(){
                this.showMyListFlg = !this.showMyListFlg;
            },
            // addCartList(request_id){
            //     console.log('add======OK');
            //     this.cartList.push(request_id);
            // },
            // removeCartList(request_id){
            //     console.log('remove=====OK');
            //     let newList = this.cartList.filter((id) => id!==request_id);
            //     this.cartList = newList;
            // },
            compShopping(){
                if(window.confirm('買い物を完了させますか？\n（カートに入っている商品をリストから削除します。）')){
                    console.log("削除処理実行");
                    axios.get(this.$store.state.BASE_URL + "request/comp", {
                        params:{
                            buy_user_id:this.$store.state.userInfo.id
                        }
                    }).then((res) => {
                        if(res){
                            console.log('買い物完了');
                            this.$store.commit('updateRequestInfo');
                        }else{
                            console.log('エラー発生');
                        }
                    })
                }else{
                    console.log('削除処理キャンセル');
                }
            }
        },
        computed:{
            returnShowList(){
                let returnList = [];
                console.log('UserId:' + this.$store.state.userInfo.id);
                if(this.showMyListFlg){
                    this.$store.state.requestInfo.forEach(item => {
                        if(item.request_user_id === this.$store.state.userInfo.id){
                            returnList.push(item);
                        }
                    });
                }else{
                    returnList = this.$store.state.requestInfo;
                }
                return returnList;
            },
            showListName:function(){
                let name = "";
                if(this.showMyListFlg){
                    name=this.$store.state.userInfo.name + 'さんの';
                }else{
                    name='みんなの'
                }
                return name;
            }
        }
    }
</script>

<style>
    .request-list{
        background-color: rgb(202, 116, 35);
        border-radius: 10px;

    }
    .change-btn{
        border: none;
        background-color: darkslateblue;
        color: white;
        right: 0;
        top:-40px
    }
    .request-table{
        border-spacing: 0 3px;
        border-collapse: separate;
    }
    .request-table th,.request-table td{
        border: 0px;
    }
</style>
<template>
    <div class="col-9 mx-auto">
        <h2 class="mb-5">マイページ</h2>
        <div class="container row col-sm-12">
            <div class="col-sm-5">
                <h3 class="">{{$store.state.userInfo.name}}さんの情報</h3>
                <div>
                    <p>お名前：{{$store.state.userInfo.name}}</p>
                    <p>メールアドレス：{{$store.state.userInfo.email}}</p>
                    <p>電話番号：{{$store.state.userInfo.tel}}</p>
                </div>
                <div class="">
                    <button class="btn btn-warning" @click="logout"><fa icon="arrow-right-from-bracket" />ログアウト</button>
                </div>
            </div>
            <div class="col-sm-7">
                <h3 class="">マイ買い物リスト</h3>
                <table class="col-sm-12 table table-striped">
                    <tr>
                        <th>商品名</th>
                        <th>追加日</th>
                    </tr>
                    <tr class="" v-for="req in returnMyRequest" :key="req.id">
                        <td>{{req.product_name}}</td>
                        <td>{{ req.created_at }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default{
    data(){
        return{

        }
    },
    methods:{
        logout(){
            this.$store.commit('loginFalse');
        },
        getCommunityRequests(id){
            // const COMMUNITY_REQ_URL = this.$store.state.BASE_URL + "community";
            axios.get(this.$store.state.BASE_URL + "request/community", {
                params:{
                    id:id
                }
            }).then((res) => {
                console.log(res);
                console.log(res.data);
                this.$store.commit('placeRequestInfo', res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    computed:{
        returnMyRequest(){
            let myList;
            if(this.$store.state.requestInfo.length > 0){
                myList = this.$store.state.requestInfo.filter( list => list.request_user_id === this.$store.state.userInfo.id && list.delete_flg === false);
                console.log(myList);
            }
            return myList;
        }
    },  
    mounted(){
            let id = this.$store.state.userInfo.id;
            this.getCommunityRequests(id);
    }
}

</script>

<style>
/* .user-info,.shopping-list{
    text-align: left;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 4px 4px 4px #775f32;
}
.user-info{
    background-color: #ffe4d3;
}
.shopping-list{
    background-color: rgb(30, 83, 9); 
}
.shopping-list h2{
    color: rgb(252, 255, 93);
}
table{
    border-collapse: collapse;
}
td,th{
    border: solid 1px;
    text-align: center;
    background-color: white;
    border-radius: 5px;
} */
</style>
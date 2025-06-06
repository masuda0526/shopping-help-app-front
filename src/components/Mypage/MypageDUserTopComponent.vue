<template>
    <div class="box">
        <button class="button button-green" @click="goRequestList">みんなの購入リスト</button>
        <button class="button button-red" @click="goShopping">買い物する</button>
        <button class="button button-pink" @click="goRequired">未対応一覧</button>
        <button class="button button-yellow" @click="goUserLink">共有ユーザー追加</button>
    </div>
</template>

<script>
import router from '@/router';

export default{
    data:function(){
        return {
            
        }
    },
    methods:{
        goShopping(){
            router.push({name:'shopping'});
        },
        goRequestList(){
            router.push({name:'requestlist'})
        },
        goUserLink(){
            router.push({name:'userlink'})
        },
        goRequired(){
            router.push({name:'required'})
        }
    }
    
}
</script>

<style scoped>
.box{
    text-align: center;
    padding: 30px 0;
}
button{
    margin-bottom: 42px;
}
</style>
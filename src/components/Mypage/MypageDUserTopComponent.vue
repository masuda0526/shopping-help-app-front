<template>
    <div class="box">
        <div class="link-box" v-if="!show">
            <p class="linkpass">●●●●●●</p>
            <fa class="eyecon" icon="eye" @click="switchLinkPass"></fa>
        </div>
        <div class="link-box" v-else>
            <p class="linkpass adjust">{{linkpass}}</p>
            <fa class="eyecon" icon="eye-slash" @click="switchLinkPass"></fa>
        </div>
        <button class="button button-green" @click="goRequestList" v-if="user_type==0">みんなの購入リスト</button>
        <button class="button button-red" @click="goShopping" v-if="user_type==0">買い物する</button>
        <button class="button button-red" @click="goPersonalShopList" v-if="user_type==1">買い物依頼</button>
        <button class="button button-pink" @click="goRequired">未対応一覧</button>
        <button class="button button-yellow" @click="goUserLink">共有ユーザー追加</button>
    </div>
</template>

<script>
import router from '@/router';

export default{
    data:function(){
        return {
            user_type: this.$store.state.userInfo.user_type,
            linkpass: this.$store.state.userInfo.linkpass,
            show: false,
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
        },
        goPersonalShopList(){
            router.push({name:'personalshoplist'})
        },
        switchLinkPass(){
           this.show = !this.show
        }
    },
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
.linkpass{
    font-size: xx-large;
}
.eyecon{
    padding-left: 10px;
    padding-top: 16px;
    font-size: x-large;
    float: right;
}
.link-box{
    display: flex;
    text-align: center;
    padding: 0% 30%;
}
.adjust{
    letter-spacing: 1px;
    margin-left: 5px;
}
</style>
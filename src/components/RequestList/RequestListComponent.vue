<template>
    <div class="m70">
        <h3 class="title t-blue">購入済<span class="subtitle">（依頼者へ配達してください）</span></h3>
        <RequestListCardComponent v-for="requests in this.inCartList" :reqlist="requests" :delverybtn="true" :key="requests.user_id"></RequestListCardComponent>
    </div>
    <div class="m70">
        <h3 class="title t-red">未購入</h3>
        <RequestListCardComponent v-for="requests in this.noCartList" :reqlist="requests" :delverybtn="false" :key="requests.user_id"></RequestListCardComponent>
    </div>
    <div class="clear">
        <button class="button button-red pos-r" @click="this.$store.commit('goMypage')">前の画面へ</button>
    </div>
</template>

<script>
import RequestListCardComponent from './RequestListCardComponent.vue';

export default{
    data:function(){
        return{
            inCartList:[],
            noCartList:[],
        }
    },
    components:{
        RequestListCardComponent
    },
    methods:{
        sortRequests(){
            let comUsrList = this.$store.state.communityRequest;
            for(let i in comUsrList){
                let comReqList = comUsrList[i].requests;
                let inCartTmpList = {};
                let noCartTmpList = {};
                let inCartTmpReqList = [];
                let noCartTmpReqList = [];
                inCartTmpList.user_id = comUsrList[i].user_id;
                noCartTmpList.user_id = comUsrList[i].user_id;
                inCartTmpList.user_name = comUsrList[i].user_name;
                noCartTmpList.user_name = comUsrList[i].user_name;
                for(let j in comReqList){
                    let comReqItem = comReqList[j];
                    if(comReqItem.inCart){
                        inCartTmpReqList.push(comReqItem);
                    }else{
                        noCartTmpReqList.push(comReqItem);
                    }
                }
                if(inCartTmpReqList.length !== 0){
                    inCartTmpList.requests = inCartTmpReqList;
                    this.inCartList.push(inCartTmpList);
                }
                if(noCartTmpReqList.length !== 0){
                    noCartTmpList.requests = noCartTmpReqList
                    this.noCartList.push(noCartTmpList);
                }
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
    },
    mounted:function(){
        this.sortRequests();
    }

}
</script>

<style scoped>
.title{
    font-size: 24px;
    padding-left: 10px;
    margin-bottom: 20px;
}
.subtitle{
    font-size: 16px;
}
.t-blue{
    border-left: 5px solid #7A95FF;
}
.t-red{
    border-left: 5px solid #FF9B9D;
}
.m70{
    margin-bottom: 70px;
}
</style>
<template>
    <div class="m70">
        <h3 class="title t-blue">購入済<span class="subtitle">（依頼者へ配達してください）</span></h3>
        <RequestListCardComponent v-for="requests in this.$store.state.purchasedList" :reqlist="requests" :delverybtn="true" :key="requests.user_id"></RequestListCardComponent>
    </div>
    <div class="m70">
        <h3 class="title t-red">未購入</h3>
        <RequestListCardComponent v-for="requests in this.$store.state.nonpurchasedList" :reqlist="requests" :delverybtn="false" :key="requests.user_id"></RequestListCardComponent>
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
        }
    },
    components:{
        RequestListCardComponent
    },
    methods:{
        // sortRequests(){
        //     this.$store.state.isBuyList = [];
        //     this.$store.state.noBuyList = [];
        //     let comUsrList = this.$store.state.communityRequest;
        //     for(let i in comUsrList){
        //         let comReqList = comUsrList[i].requests;
        //         let isBuyTmpList = {};
        //         let noBuyTmpList = {};
        //         let isBuyTmpReqList = [];
        //         let noBuyTmpReqList = [];
        //         isBuyTmpList.user_id = comUsrList[i].user_id;
        //         noBuyTmpList.user_id = comUsrList[i].user_id;
        //         isBuyTmpList.user_name = comUsrList[i].user_name;
        //         noBuyTmpList.user_name = comUsrList[i].user_name;
        //         for(let j in comReqList){
        //             let comReqItem = comReqList[j];
        //             if(comReqItem.isbuy){
        //                 isBuyTmpReqList.push(comReqItem);
        //             }else{
        //                 noBuyTmpReqList.push(comReqItem);
        //             }
        //         }
        //         if(isBuyTmpReqList.length !== 0){
        //             isBuyTmpList.requests = isBuyTmpReqList;
        //             this.$store.state.isBuyList.push(isBuyTmpList);
        //         }
        //         if(noBuyTmpReqList.length !== 0){
        //             noBuyTmpList.requests = noBuyTmpReqList
        //             this.$store.state.noBuyList.push(noBuyTmpList);
        //         }
        //     }
        // },
        removeOtherBuyList(rqD){
            let rtD = {}
            // let rtD = _.cloneDeep(rqD);
            let rtL = []
            rtD['user_id'] = rqD.user_id;
            rtD['user_name'] = rqD.user_name;
            rtD['requests'] = rqD.requests;
            console.log('rtD')
            console.log(rtD)
            for(let rtI of rtD.requests){
                if(rtI.buy_user_id ==  this.$store.state.userInfo.id){
                    rtL.push(rtI)
                }
            }
            rtD.requests = rtL;
            return rtD;
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
        this.$store.commit('sortRequests');
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
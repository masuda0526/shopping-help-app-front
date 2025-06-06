<template>
    <div class="mb-2 chngBtn">
        
        <span v-if="perBuycode" @click="togglePerBuycode"><fa icon="rotate"/>購入毎に表示中</span>
        <span v-else @click="togglePerBuycode"><fa icon="rotate"/>まとめて表示中</span>
    </div>
    <div v-if="perBuycode">
        <div v-for="(li) in this.$store.state.deliveryList" :key="li.buycode">
            <RequestListCardComponent :reqlist="li" :delverybtn="false" :key="li.buycode"></RequestListCardComponent>
            <button class="button button-blue deliveryBtn" :data-buycode="li.buycode" :data-seq="li.seq" @click="this.compDeliveryByBuycode($event)">届けた</button>
        </div>
    </div>
    <div v-else>
        <RequestListCardComponent :reqlist="this.listPerUser" :delverybtn="false"></RequestListCardComponent>
        <button class="button button-blue deliveryBtn" @click="this.compDeliveryByUserId()">届けた</button>
    </div>
</template>

<script>
import router from '@/router';
import RequestListCardComponent from '../RequestList/RequestListCardComponent.vue';
import axios from 'axios';


export default{
    data(){
        return{
            perBuycode:true,
            listPerUser:{
                user_id:0,
                user_name:'',
                requests:[]
            }
        }
    },
    components:{
        RequestListCardComponent
    },
    methods:{
        compDeliveryByBuycode(e){
            let buyCode = e.target.dataset.buycode
            let seqNum = e.target.dataset.seq
            this.$store.commit('debug', 'buycodeとseqで配達処理を開始')
            this.$store.commit('debug','buycode: ' + buyCode)
            this.$store.commit('debug','seq: ' + seqNum)
            axios.get(this.$store.state.BASE_URL + 'complete/delivary/buycode', {
                params:{
                    buycode:buyCode,
                    seq:seqNum
                }
            }).then(data => {
                this.$store.commit('debug', '取得したデータ')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'confirmFlgsへ登録');
                this.$store.commit('initConfirmFlgs');
                this.$store.state.confirmFlgs.registMethod = 1;
                this.$store.state.confirmFlgs.buycode = buyCode;
                this.$store.state.confirmFlgs.seq = seqNum;
                router.push({name:'confilm'})
            }).catch(err => {
                console.log(err)
            })
        },
        compDeliveryByUserId(){
            this.$store.commit('debug', 'r_uidとb_uidで配達処理を開始');
            axios.get(this.$store.state.BASE_URL + 'complete/delivary/request_id', {
                params:{
                    r_uid:this.listPerUser.user_id,
                    b_uid:this.$store.state.userInfo.id
                }
            }).then(data => {
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'confirmFlgsへ登録');
                this.$store.commit('initConfirmFlgs');
                this.$store.state.confirmFlgs.registMethod = 2;
                this.$store.state.confirmFlgs.r_uid = this.listPerUser.user_id;
                this.$store.state.confirmFlgs.b_uid = this.$store.state.userInfo.id;
                router.push({name:'confilm'})
            }).catch(err => {
                console.log(err)
            })
        },
        createListPerUser(){
            this.$store.commit('debug','ユーザーごとのリクエスト作成');
            let li = this.$store.state.deliveryList
            if(li.length > 0){
                this.listPerUser.user_id = li[0].user_id;
                this.listPerUser.user_name = li[0].user_name;
                for(let itl of li){
                    for(let item of itl.requests){
                        this.listPerUser.requests.push(item)
                    }
                }
            }
            console.log('作成したリスト');
            console.log(this.listPerUser);
        },
        togglePerBuycode(){
            this.perBuycode = !this.perBuycode;
        }
    },
    mounted:function(){
        this.createListPerUser();
    }
}
</script>

<style scoped>
.deliveryBtn{
    margin: 40px auto;
    display: block;
}
.chngBtn{
    padding: 15px 0;
    text-align: right;
    font-size: 18px;
}
.ic:hover, .chngBtn span:hover{
    cursor: pointer;
}
</style>
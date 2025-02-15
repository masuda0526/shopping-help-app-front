<template>
    <div class="comCard dlvBtnPar" >
        <button class="button-s button-green dlvBtn" v-if="delverybtn" @click="this.goDeliveryPage(reqlist.user_id)">届ける</button>
        <h3 class="comCard-name">{{ reqlist.user_name }}さん</h3>
        <RequestListCardItemComponent v-for="item in reqlist.requests" :reqitem="item" :key="item.id"></RequestListCardItemComponent>
    </div>
</template>

<script>
import router from '@/router';
import RequestListCardItemComponent from './RequestListCardItemComponent.vue';

export default{
    components:{
        RequestListCardItemComponent
    },
    props:['reqlist', 'delverybtn'],
    methods:{
        goDeliveryPage(id){
            this.$store.commit('getDeliveryPageInfo', id)
            // this.moveDeliveryPage()
        },
        getDeilveryList(id){
            this.$store.commit('debug', 'user_id');
            this.$store.commit('debug', id);
            this.$store.commit('debug', '配達ページ用のデータを取得');
            this.$store.commit('getDeliveryPageInfo', id);
            this.$store.commit('debug', '取得したデータを確認');
        },
        moveDeliveryPage(){
            let that = this;
            return new Promise(function(resolve, reject){
                try{
                    that.$store.commit('debug', '配達ページへ遷移します。');
                    resolve(router.push({name:'delivery'}));
                }catch(e){
                    reject()
                }
            })
        }
    }
}
</script>

<style scoped>
.dlvBtnPar{
    position: relative;
}
.dlvBtn{
    position: absolute;
    right: 8px;
    top:8px
}

</style>

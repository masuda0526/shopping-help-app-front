<template>
    <div>
        <div class="mb-2 btnArea">
            <span v-if="isShowPerBuycode" @click="togglePerBuycode"><fa icon="rotate"/>購入毎に表示中</span>
            <span v-else @click="togglePerBuycode"><fa icon="rotate"/>ユーザー毎に表示中</span>
        </div>
        <ActionItemComponent v-for="list, index in showList" :product_list="list" :key="index"></ActionItemComponent>
    </div>
</template>

<script>
import ActionItemComponent from './ActionItemComponent.vue';
import axios from 'axios';

    export default{
        components:{
            ActionItemComponent
        },
        data(){
            return{
                showList:[],
                isShowPerBuycode:false,
            }
        },
        methods:{
            togglePerBuycode(){
                let type = this.$store.state.userInfo.user_type;
                this.isShowPerBuycode = !this.isShowPerBuycode;
                if(this.isShowPerBuycode){
                    this.$store.state.confirmFlgs.registMethod = 1;
                    if(type ==0){
                        this.setRequiredActionListForBuyerPerBuycode();
                    }else{
                        this.setRequiredActionListForRequesterPerBuycode();
                    }
                }else{
                    this.$store.state.confirmFlgs.registMethod = 2;
                    if(type==0){
                        this.setRequiredActionListForBuyerPerUser();
                    }else{
                        this.setRequiredActionListForRequesterPerUser();
                    }
                }
                this.$store.commit('debug', '取得したデータ');
                this.$store.commit('debug', this.showList);
            },
            setRequiredActionListForBuyerPerUser(){
                this.$store.commit('debug', '購入者用のユーザー毎リスト取得');
                axios.get(this.$store.state.BASE_URL + 'require/peru/b', {
                    params:{
                        u_id:this.$store.state.userInfo.id
                    }
                }).then(res =>{
                    this.showList = res.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            setRequiredActionListForBuyerPerBuycode(){
                this.$store.commit('debug', '購入者用の購入ID毎リスト取得');
                axios.get(this.$store.state.BASE_URL + 'require/perb/b', {
                    params:{
                        u_id:this.$store.state.userInfo.id
                    }
                }).then(res =>{
                    this.showList = res.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            setRequiredActionListForRequesterPerUser(){
                this.$store.commit('debug', '依頼者用のユーザー毎リスト取得');
                axios.get(this.$store.state.BASE_URL + 'require/peru/r',{
                    params:{
                        u_id:this.$store.state.userInfo.id
                    }
                }).then(res => {
                    this.showList = res.data;
                })
            },
            setRequiredActionListForRequesterPerBuycode(){
                this.$store.commit('debug', '依頼者用の購入ID   毎リスト取得');
                axios.get(this.$store.state.BASE_URL + 'require/perb/r',{
                    params:{
                        u_id:this.$store.state.userInfo.id
                    }
                }).then(res => {
                    this.showList = res.data;
                })
            }
        },
        created(){
            this.$store.commit('checkLogin');
            let type = this.$store.state.userInfo.user_type;
            this.$store.state.confirmFlgs.registMethod = 2;
            if(type == 0){
                this.setRequiredActionListForBuyerPerUser();
            }else{
                this.setRequiredActionListForRequesterPerUser();
            }
        }
    }
</script>

<style scoped>
    .btnArea{
        text-align: right;
    }
</style>
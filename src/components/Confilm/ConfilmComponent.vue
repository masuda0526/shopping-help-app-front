<template>
    <div class="confilm-msg" v-if="isDelUsr">
        <p class="mb-3">
            依頼者へ商品を受け渡し、レシート等を用いて内容確認をおこなってください。
        </p>
        <p class="mb-5">
            受け渡し・内容の確認が完了したら、下の「受け渡し完了」ボタンを押してください。
        </p>
    </div>
    <div class="confilm-msg" v-else>
        <p class="mb-3">
            購入者から商品を受け取り、レシート等を用いて内容確認をおこなってください。
        </p>
        <p class="mb-5">
            受け渡し・内容の確認が完了したら、下の「受け取り完了」ボタンを押してください。
        </p>
    </div>
    <div>
        <button class="button button-pink confilmBtn" @click="accept()" v-if="isDelUsr">受け渡し完了</button>
        <button class="button button-pink confilmBtn" @click="accept()" v-else>受け取り完了</button>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default{
    data(){
        return{
            isDelUsr:false
        }
    },
    methods:{
        accept(){
            let regMethod = this.$store.state.confirmFlgs.registMethod;
            let user_type = this.$store.state.userInfo.user_type;
            switch(regMethod){
                case 1:
                    if(user_type == 0){
                        this.acceptDelivaryByBuycode();
                    }else{
                        this.acceptRecieveByBuycode();
                    }
                    break;
                case 2:
                    if(user_type == 0){
                        this.acceptDelivaryByRequestUserId();
                    }else{
                        this.acceptRecieveByRequestId();
                    }
                    break;
                default:
                    this.$store.commit('debug', '不正なアクセスの可能性があります。');
                    router.push({name:'mypage'});
            }
        },
        acceptDelivaryByBuycode(){
            let buyCode = this.$store.state.confirmFlgs.buycode;
            let seqNum = this.$store.state.confirmFlgs.seq;
            this.$store.commit('debug', 'buycodeで最終確認処理を行います。')
            axios.get(this.$store.state.BASE_URL + 'accept/delivary/buycode',{
                params:{
                    buycode:buyCode,
                    seq:seqNum
                }
            }).then(data => {
                this.$store.commit('debug', '登録成功。返却されたデータ。')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'マイページへ遷移します。')
                router.push({name:'mypage'});
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容。');
                this.$store.commit('debug', err);
            })
        },
        acceptDelivaryByRequestUserId(){
            let rUid = this.$store.state.confirmFlgs.r_uid;
            let bUid = this.$store.state.confirmFlgs.b_uid;
            this.$store.commit('debug', 'r_uid,b_uidを用いて最終確認処理を行います');
            axios.get(this.$store.state.BASE_URL + 'accept/delivary/request_id', {
                params:{
                    r_uid:rUid,
                    b_uid:bUid
                }
            }).then(data => {
                this.$store.commit('debug', '登録成功。返却されたデータ。')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'マイページへ遷移します。')
                router.push({name:'mypage'});
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容。');
                this.$store.commit('debug', err);
            })
        },
        acceptRecieveByBuycode(){
            let buyCode = this.$store.state.confirmFlgs.buycode;
            let seqNum = this.$store.state.confirmFlgs.seq;
            console.log('buycode = ' + buyCode);
            console.log('seq = ' + seqNum);
            this.$store.commit('debug', 'buycodeで最終確認処理を行います。(acceptRecieve)');
            axios.get(this.$store.state.BASE_URL + 'accept/recieve/buycode', {
                params:{
                    buycode: buyCode,
                    seq: seqNum
                }
            }).then(data => {
                this.$store.commit('debug', '登録成功。返却されたデータ。')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'マイページへ遷移します。')
                router.push({name:'mypage'});
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容。');
                this.$store.commit('debug', err);
            })
            router.push({name:'mypage'});
        },
        acceptRecieveByRequestId(){
            let rUid = this.$store.state.confirmFlgs.r_uid;
            let bUid = this.$store.state.confirmFlgs.b_uid;
            this.$store.commit('debug','r_uid,b_uidで最終確認処理を行います。(acceptRecieve)' );
            axios.get(this.$store.state.BASE_URL + 'accept/recieve/request_id', {
                params:{
                    r_uid:rUid,
                    b_uid:bUid
                }
            }).then(data => {
                this.$store.commit('debug', '登録成功。返却されたデータ。')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'マイページへ遷移します。')
                router.push({name:'mypage'});
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容。');
                this.$store.commit('debug', err);
            })
        }
    },
    mounted(){
        // let regMethod = this.$store.state.confirmFlgs.registMethod;
        let userType = this.$store.state.userInfo.user_type;
        this.$store.commit('debug', 'userType = '+ userType)
        this.$store.commit('debug', this.$store.state.confirmFlgs)
        if(userType==0){
            this.isDelUsr = true;
        }else{
            this.isDelUsr = false;
        }
    }
}
</script>

<style scoped>
.confilm-msg{
    font-size: 20px;
}
.confilmBtn{
    display: block;
    margin: 0 auto;
}
</style>
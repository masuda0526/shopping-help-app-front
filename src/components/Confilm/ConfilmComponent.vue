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
        <button class="button button-pink confilmBtn" @click="acceptDelivary()" v-if="isDelUsr">受け渡し完了</button>
        <button class="button button-pink confilmBtn" v-else>受け取り完了</button>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default{
    props:['isDelUsr'],
    methods:{
        acceptDelivary(){
            let regMethod = this.$store.state.confirmFlgs.registMethod;
            switch(regMethod){
                case 1:
                    this.acceptDelivaryByBuycode();
                    break;
                case 2:
                    this.acceptDelivaryByRequestUserId();
                    break;
                case 3:
                    this.acceptRecieve();
                    break;

                default:
                    this.$store.commit('debug', '不正なアクセスの可能性があります。');
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
            axios.get(this.$store.state.BASE_URL + 'accept/delivery/ruid', {
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
        acceptRecieve(){
            let buyCode = this.$store.state.confirmFlgs.buycode;
            let seqNum = this.$store.state.confirmFlgs.seq;
            this.$store.commit('debug', 'buycodeで最終確認処理を行います。(acceptRecieve)');
            axios.get(this.$store.state.BASE_URL + 'completerecieve', {
                params:{
                    buycode: buyCode,
                    seq: seqNum
                }
            }).then(data => {
                this.$store.commit('debug', '登録成功。返却されたデータ。')
                this.$store.commit('debug', data);
                this.$store.commit('debug', 'マイページへ遷移します。')
                router.push({name:'personalshoplist'});
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容。');
                this.$store.commit('debug', err);
            })
            router.push({name:'personalshoplist'});
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
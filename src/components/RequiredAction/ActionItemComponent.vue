<template>
    <div v-if="product_list.length != 0">
        <div class="item comCard" :key="product_list.user_id">
            <div class="item-head">
                <div>
                    {{product_list.user_name}}さん
                </div>
                <button class="button-s button-pink dlvBtn" @click="clickConfBtn">確認</button>
            </div>
            <div class="item-content">
                <div class="comCard-item" v-for="product in product_list.requests" :key="product.id">
                    <p>{{product.product_name}}</p>
                    <p>{{ product.vol }}{{ product.unit }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        未対応の一覧はありません。
    </div>
</template>

<script>
import router from '@/router';

    export default{
        props:['product_list'],
        methods:{
            clickConfBtn(){
                let rgstMethod = this.$store.state.confirmFlgs.registMethod;
                if(rgstMethod == 1){
                    // buycodeで登録
                    this.$store.state.confirmFlgs.buycode = this.product_list.buycode;
                    this.$store.state.confirmFlgs.seq = this.product_list.seq;
                    router.push({name:'confilm'})
                }else if(rgstMethod == 2){
                    // userIdで登録
                    this.$store.state.confirmFlgs.r_uid = this.product_list.user_id;
                    this.$store.state.confirmFlgs.b_uid = this.$store.state.userInfo.id;
                    router.push({name:'confilm'})
                }else if(rgstMethod == 3){
                    this.$store.state.confirmFlgs.buycode = this.product_list.buycode;
                    this.$store.state.confirmFlgs.seq = this.product_list.seq;
                    router.push({name:'confilm'})
                }
            }
        }
    }
</script>

<style scoped>
.item-head{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>
<template>
    <div class="comCard-item">
        <div class="comCard-product setw">
            <p>{{item.product_name}}</p>
            <p>{{ showVolAndUnit }}</p>
        </div>
        <button class="button button-blue" v-if="item.inCart" @click="toggleInCart">購入済</button>
        <button class="button button-yellow" v-else @click="toggleInCart">カートへ</button>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data:function(){
        return{
            isInCart:false
        }
    },
    props:['item'],
    methods:{
        toggleInCart(){
            axios.get(this.$store.state.BASE_URL + 'request/togglecart', {
                params:{
                    request_id:this.item.id,
                    inCart_user_id:this.$store.state.userInfo.id,
                    bool:!this.item.inCart
                }
            }).then((res) => {
                if(res){
                    // console.log('toggleInCart----OK');
                    this.$store.commit('getRequestInfoForMypage');
                    this.isInCart = !this.isInCart;
                }else{
                    // console.log('toggleInCart----NG');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    computed:{
        showVolAndUnit(){
            return this.item.vol + this.item.unit;
        }
    }
}
</script>

<style scoped>
.setw{
    width: 220px;
}
</style>
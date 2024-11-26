<template>
    <tr>
        <td>{{item.product_name}}</td>
        <td>{{item.created_at}}</td>
        <td>{{item.name}}</td>
        <td v-if="item.inCart && item.inCart_user_id == this.$store.state.userInfo.id" @click="toggleInCart" class="text-secondary"><fa icon="circle-check" />選択済</td>
        <td v-else-if="item.inCart && item.inCart_user_id != this.$store.state.userInfo.id" class="text-danger">ほかの人がカートへ入れてます</td>
        <td v-else @click="toggleInCart"><fa icon="cart-arrow-down" />カートへ</td>
    </tr>
</template>

<script>
    import axios from 'axios';

    axios
    export default{
        data(){
            return {
                // inCart:false
            }
        },
        props:['item'],
        methods:{
            toggleInCart(){
                this.toggleDBInCart();
            },
            toggleDBInCart(){
                axios.get(this.$store.state.BASE_URL + 'request/togglecart', {
                    params:{
                        request_id:this.item.id,
                        inCart_user_id:this.$store.state.userInfo.id,
                        bool:!this.item.inCart
                    }
                }).then((res) => {
                    if(res){
                        // console.log('toggleInCart----OK');
                        this.$store.commit('updateRequestInfo');
                    }else{
                        // console.log('toggleInCart----NG');
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
    }
</script>